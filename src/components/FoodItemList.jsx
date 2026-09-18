import FoodItem from "./FoodItem";
import { useState } from "react";
import Modal from "./Modal";

export default function FoodItemList({foodItems, onUpdate}){
  const [deleteWarningIsOpen, setDeleteWarningIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentID, setCurrentId] = useState(null);

  function handleOnAddFoodItem() {
    onUpdate(prev => ({
      ...prev,
      foodItems: [
        ...prev.foodItems,
        { id: crypto.randomUUID(), desc: '', cals: 0, servs: 0, num: 0 },
      ],
    }));
  }

  function showDeleteConfirmation(id){
    // !selectedItems.includes(id) && setSelectedItems([...selectedItems, id]);
    setCurrentId(id);
    setDeleteWarningIsOpen(true);
  }

  function handleOnDeleteFoodItem(id){
    setDeleteWarningIsOpen(false);
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
    <div>
      {foodItems?.length ? (
        <div className="food-list mb-5 max-h-130 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            {foodItems.map((food, index) => (
              <FoodItem
                key={food.id}
                id={food.id}
                desc={food.desc}
                cals={food.cals}
                servs={food.servs}
                num={food.num}
                onDelete={(id) => showDeleteConfirmation(id)}
                onUpdate={handleOnUpdateFoodItem}
              />
            ))}
        </div>
        ) : null
        }
      <div className="flex justify-end">
        <button 
          className="py-1 px-2 mr-4 bg-green-700 hover:bg-green-600 rounded-md text-white font-bold"
          onClick={handleOnAddFoodItem}
        >+ Add Food Item</button>
      </div>
      <Modal isOpen={deleteWarningIsOpen} onClose={() => setDeleteWarningIsOpen(false)}>
        <h3 className="font-bold text-center">Are you sure you want to delete this food item?</h3>
        <div className="flex gap-4 justify-end items-center">
          <button 
            className="px-2 py-1 rounded rounded-md bg-green-700 hover:bg-green-600 text-white font-bold"
            onClick={() => setDeleteWarningIsOpen(false)}
          >
            Cancel
          </button>
          <button 
            className="px-2 py-1 rounded rounded-md bg-red-700 hover:bg-red-600 text-white font-bold" 
            onClick={() => handleOnDeleteFoodItem(currentID)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
    );
  }
