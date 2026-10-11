
import './App.css'
import Input from './components/Input';
import Modal from './components/Modal';
import { useState, useRef } from 'react';
import Card from './components/Card';
import Dropdown from './components/Dropdown';
import FoodItemList from './components/FoodItemList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { formatNumber, daysOfFood, daysOfWater } from './utility/utils';
import { Printer } from 'react-bootstrap-icons';
import  PrintableReport from './components/PrintReport';
import RiveGauge from './components/RiveGauge';
import waterRiv from './assets/water.riv?url';
import foodRiv from './assets/food.riv?url';

function App() {
  const [waterInfoOpen, setWaterInfoOpen] = useState(false);
  const [foodInfoOpen, setFoodInfoOpen] = useState(false);

  const timeDivChoices = [
    {label: "Day(s)", value: "days", days:1},
    {label: "Month(s)", value: "months", days:30.4},
    {label: "Year(s)", value: "years", days:365}
  ];

  const [data, setData] = useLocalStorage('data_history', 
    {
      numPeople:1, 
      galsWater:0, 
      timeGoal: { num: 2, div: 1 },
      foodItems:[]
    }
  );

  const printRef = useRef(null);

  const daysWater = formatNumber(daysOfWater(data.numPeople, data.galsWater));
  const daysFood = formatNumber(daysOfFood(data));

  const percOfTimeGoal = (daysOfResource) => {
    const goalDays = (timeDivChoices[data.timeGoal.div]?.days ?? 1) * Number(data.timeGoal.num);
    if (!(goalDays > 0)) return 0;
    let perc = daysOfResource / goalDays * 100;
    perc = Math.min(Math.max(perc, 0), 100);
    return Math.round(perc);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || e.target.tagName === 'TEXTAREA') return;

    const focusables = Array.from(
      e.target.getRootNode().querySelectorAll('input:not([disabled]), select:not([disabled])')
    );

    const currentIndex = focusables.indexOf(e.target);
    
    if (currentIndex !== -1 && focusables[currentIndex + 1]) {
      e.preventDefault(); // Prevents default form submit or key behaviors
      focusables[currentIndex + 1].focus(); // Moves focus & fires onBlur on current input
    }
  };

  const handleOnPrint = () => {
    const dateStr = new Date().toISOString().split('T')[0];
    document.title = `Food_and_Water_Storage_${dateStr}`;
    window.print();
  }

  return (
    <>
    <div className="p-4 sm:p-10 screen-only" onKeyDown={handleKeyDown}>
      <h1 className="font-bold text-3xl mb-10 text-gray-700">Food & Water Storage Calculator</h1>
      <div className="flex flex-col md:flex-row md:gap-3 justify-between md:items-end">
        <div className="flex flex-col md:w-1/2">
          <h3 className="mb-2">Neighborhood Protection Program (NPP)<br /> or Household </h3>
          <Card>
            <Input 
              label="Number of People" 
              type="text" 
              value={data.numPeople || 1}
              onChange={(val) => setData(prev => ({ ...prev, numPeople: val }))}
            />
          </Card>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h3 className="mb-2">Clean Stored Water 
            <span className="ml-1 text-sm underline cursor-pointer">
              <a onClick={() => setWaterInfoOpen(true)}>more info</a>
            </span>
          </h3>
          <Modal isOpen={waterInfoOpen} onClose={() => setWaterInfoOpen(false)}>
            <h3 className="font-bold text-left">Water… The Triple-One Rule of Thumb</h3>
            <p>This rule of water use will give each person in your NPP drinking, minimal cooking and “sponge bathing” water of <strong>One Gallon</strong> for <strong>One Person</strong> for <strong>One Day.</strong></p>
            <p>This depends, obviously on the time of year, your climate, and individual needs. In hot months you will need more. But this rule will generally keep all Group Members functioning adequately. You should have as much water in storage as possible and your NPP should have an identified renewable safe water source.</p>
          </Modal>
          <Card>
            <Input 
              label="Gallons of Water" 
              type="number" 
              value={data.galsWater || 0}
              onChange={(val) => setData(prev => ({ ...prev, galsWater: val }))}
            />
          </Card>
        </div>
      </div>
      <section className="mt-5">
        <h3 className="mb-2">Stored Food (preferrably non-perishable items) 
          <span className="ml-1 text-sm underline cursor-pointer">
            <a onClick={() => setFoodInfoOpen(true)}>more info</a>
          </span>
        </h3>
        <Modal isOpen={foodInfoOpen} onClose={() => setFoodInfoOpen(false)}>
          <h3>Calories of Emergency Food Stored</h3>
          <p>A simple rule of thumb is to calculate <strong>2000 calories of food requirement per day for each person.</strong> This number “2000” will be used below to calculate your <strong>Number of Days of Emergency Food Stored.</strong></p>
          <p>There is a Calorie Chart at the bottom of the next page that you can reference for a more detailed calculation of individual food needs in calories.</p>
          <p>Always keep hardcopies, as computers become paperweights after some Catastrophic Events when their 1s and 0s go to digital heaven. Or copy the form on the next page to list and calculate your “Calories of Emergency Food Stored” from all the items of Emergency Food you have.</p>
        </Modal>
        <section className="p-2 pr-1 sm:p-5 sm:pr-3 border border-gray-200 rounded rounded-2xl">
          <FoodItemList 
            foodItems={data.foodItems}
            onUpdate={setData}
          />
        </section>
      </section>
      <section>
        <h2 className="mb-2 text-gray-700">Total Days of Stored Resources</h2>
        <div className="m-auto flex flex-col md:w-80">
          <Card>
            <h3 className="mb-2">Goal Time Frame</h3>
            <div className="flex gap-1 justify-center m-auto w-50 mb-2">
              <Input 
                className="w-30"
                inputMode="number"
                type="text" 
                value={data.timeGoal.num || 2}
                onChange={(val) => setData(prev => ({ ...prev, timeGoal: {...prev.timeGoal, num: val} }))}
              />
              <Dropdown 
                className="bg-white"
                value={timeDivChoices[data.timeGoal.div ?? 1]}
                options={timeDivChoices}
                onSelect={(choice) => setData(prev => ({ ...prev, timeGoal: {...prev.timeGoal, div: timeDivChoices.indexOf(choice)}}))}
              /> 
            </div>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:gap-4">
          <Card className="bg-blue-100">
            <div className="pt-4 mb-0 flex flex-col justify-center items-center">
              <label className="text-center text-blue-950 font-bold mb-2">Number of days of water</label>
              <div className="bg-blue-400 w-20 m-auto text-white rounded rounded-8 font-bold text-2xl mb-0">{daysWater}</div>
            </div>
            <RiveGauge 
              className="w-80 h-80"
              src={waterRiv}
              artboard="Water"
              stateMachine="WaterState"
              viewModel="WaterModel" 
              property="waterPercentOfTime" 
              value={percOfTimeGoal(daysWater)} 
            />
          </Card>
          <Card className="bg-amber-100">
            <div className="pt-4 mb-0 flex flex-col justify-center items-center">
              <label className="text-center text-amber-950 font-bold mb-2">Number of days of food</label>
              <div className="bg-orange-400 w-20 m-auto text-white rounded rounded-8 font-bold text-2xl mb-0">{daysFood}</div>
            </div>
            <RiveGauge
              className="w-80 h-80" 
              src={foodRiv}
              artboard="Food" 
              stateMachine="FoodState"
              viewModel="FoodModel" 
              property="foodPercentOfTime" 
              value={percOfTimeGoal(daysFood)} 
            />
          </Card>
        </div>
        <button className="m-auto py-2 px-4 bg-green-700 hover:bg-green-600 rounded-md text-white font-bold w-[150px] flex items-center justify-center gap-2" onClick={handleOnPrint}><Printer /> Print</button>
      </section>
    </div>
    <PrintableReport ref={printRef} data={data} />
    </>
  );
}

export default App
