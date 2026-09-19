import Input from "./Input";
import Output from "./Output"
import Card from "./Card"
import { formatNumber, totalCalories } from "../utility/utils";
import { useState } from "react";

export default function FoodItem({id, desc, cals, servs, num, onDelete, deleteWarningIsOpen, onUpdate}){
  return(
    <Card className="p-0 flex flex-col bg-gray-200">
      <div className="py-2 px-4 food-item flex flex-col md:flex-row gap-3 items-start md:items-end md:justify-evenly">
        <Input
          placeholder="enter description"
          alignment="left"
          label="Food Item Description" 
          type="text" 
          labelPlace="top" 
          value={desc}
          onChange={(val) => onUpdate(id, {desc: val})}
        />
        <Input 
          label="Cal. per Serving" 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={cals}
          onChange={(val) => onUpdate(id, {cals: val})}
        />
        <Input 
          label="Serv. per Cont." 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={servs}
          onChange={(val) => onUpdate(id, {servs: val})}
        />
        <Input 
          label="# of Containers" 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={num}
          onChange={(val) => onUpdate(id, {num: val})}
        />
      </div>
      <div className="border border-t-1 border-gray-200 bg-gray-100 rounded-b-lg">
        <div className="flex justify-between items-center py-2 px-4">
          <Output className="text-sm" label="Total Item Calories:" type="float" value={totalCalories(cals, servs, num)} />
          <button 
            className="pl-2 pr-3 py-0 bg-red-400 hover:bg-red-500 font-bold text-sm rounded-md text-white"
            onClick={() => onDelete(id)}
          >
            &times; Remove
          </button>
        </div>
      </div>
    </Card>
);
}
