
import './App.css'
import FoodItem from './components/FoodItem'
import Input from './components/Input';
import Modal from './components/Modal';
import { useRef, useState } from 'react';
import Card from './components/Card';
import FoodItemList from './components/FoodItemList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [waterInfoOpen, setWaterInfoOpen] = useState(false);
  const [foodInfoOpen, setFoodInfoOpen] = useState(false);
  const [calc, setCalc] = useLocalStorage('calc_history', 
    {
      numPeople:1, 
      galsWater:0, 
      foodItems:[]
    }
  );

  const daysOfWater = calc.galsWater / calc.numPeople;
  const daysOfFood = calc.foodItems?.reduce(
    (total, food) => total + food.cals * food.servs * food.num / (calc.numPeople * 2000 ), 0
  );

  return (
    <div className="p-10">
      <section className="space-y-2">
        <h3 className="font-bold text-xl">Neighborhood Protection Program (NPP) or Household </h3>
        <Card>
          <Input 
            label="Number of People" 
            type="number" 
            value={calc.numPeople || 1}
            onChange={(e) => setCalc(prev => ({ ...prev, numPeople: e.target.value }))}
          />
        </Card>
      </section>
      <section className="space-y-2">
        <h3>Clean Stored Water 
          <span className="ml-1 text-sm underline cursor-pointer">
            <a onClick={() => setWaterInfoOpen(true)}>more info</a>
          </span>
        </h3>
        <Modal isOpen={waterInfoOpen} onClose={() => setWaterInfoOpen(false)}>
          <h3 className="font-bold text-center">Water… The Triple-One Rule of Thumb</h3>
          <p>This rule of water use will give each person in your NPP drinking, minimal cooking and “sponge bathing” water of <strong>One Gallon</strong> for <strong>One Person</strong> for <strong>One Day.</strong></p>
          <p>This depends, obviously on the time of year, your climate, and individual needs. In hot months you will need more. But this rule will generally keep all Group Members functioning adequately. You should have as much water in storage as possible and your NPP should have an identified renewable safe water source.</p>
        </Modal>
        <Card>
          <Input 
            label="Gallons of Water" 
            type="number" 
            value={calc.galsWater || 0}
            onChange={(e) => setCalc(prev => ({ ...prev, galsWater: e.target.value }))}
          />
        </Card>
      </section>
      <section className="">
        <h3>Stored Food (preferrably non-perishable items) 
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
        <section className="">
          <FoodItemList 
            foodItems={calc.foodItems}
            onUpdate={setCalc}
          />
        </section>
      </section>
      <div className="">
        <h3>Total Days of Stored Resources</h3>
        <div className="">
          <label className="text-center">number of days of water</label>
          <h2 id="daysofwater">{daysOfWater}</h2>
        </div>
        <div className="">
          <label className="text-center">number of days of food</label>
          <h2 id="daysoffood">{daysOfFood}</h2>
        </div>
        <div className="">
          <p className="text-center">
            <button classname="print">print this out</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App
