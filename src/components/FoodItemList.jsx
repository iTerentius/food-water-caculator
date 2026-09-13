import FoodItem from "./FoodItem";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function FoodItemList({foodItems, onUpdate}){

  function handleOnAddFoodItem() {
    onUpdate(prev => ({
      ...prev,
      foodItems: [
        ...prev.foodItems,
        { id: crypto.randomUUID(), desc: '', cals: 0, servs: 0, num: 0 },
      ],
    }));
  }

  function handleOnDeleteFoodItem(id){
    onUpdate(prev => ({
      ...prev,
      foodItems: prev.foodItems.filter(item => item.id !== id),
    }));
  }

  function handleOnUpdateFoodItem(id, changes){
    onUpdate(prev => ({
      ...prev,
      foodItems: prev.foodItems.map(item =>
        item.id === id ? {...item, ...changes} : item
      ),
    }));
  }

  return (
    <div className="food-list">
      {foodItems.length && 
        foodItems.map((food, index) => (
          <FoodItem
            key={food.id}
            id={food.id}
            desc={food.desc}
            cals={food.cals}
            servs={food.servs}
            num={food.num}
            onDelete={handleOnDeleteFoodItem}
            onUpdate={handleOnUpdateFoodItem}
          />
        ))
      }
      <div className="">
        <div className="">
          <button 
            className="py-2 px-4 bg-green-700 rounded-md text-white font-bold"
            onClick={handleOnAddFoodItem}
          >+ Add Food Item</button>
        </div>
      </div>
    </div>
    );
  }
