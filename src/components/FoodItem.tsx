import Input from "./Input";
import Output from "./Output"
import Card from "./Card"
import { totalCalories } from "../utility/utils";

export type FoodItemData = {
  id: string
  desc: string
  cals: number
  servs: number
  num: number
}

type FoodItemProps = {
  id: string
  desc: string
  cals: number
  servs: number
  num: number
  onDelete: (id: string) => void 
  onUpdate: (id: string, changes: Partial<FoodItemData>) => void 
}

export default function FoodItem({id, desc, cals, servs, num, onDelete, onUpdate}: FoodItemProps){
  return(
    <Card className="p-0 flex flex-col bg-gray-200">
      <div className="
        py-2 px-4 
        food-item 
        flex
        flex-wrap
        md:flex-nowrap
        gap-3
        items-end
        ">
        <Input
          grow
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
          onChange={(val) => onUpdate(id, {cals: Number(val)})}
        />
        <Input 
          label="Serv. per Cont." 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={servs}
          onChange={(val) => onUpdate(id, {servs: Number(val)})}
        />
        <Input 
          label="# of Containers" 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={num}
          onChange={(val) => onUpdate(id, {num: Number(val)})}
        />
      </div>
      <div className="border border-t border-gray-200 bg-gray-100 rounded-b-lg">
        <div className="flex flex-wrap gap-2 justify-between items-center py-2 px-4">
          <Output className="text-sm whitespace-nowrap" label="Total Item Calories:" type="float" value={totalCalories(cals, servs, num)} />
          <button
            className="ml-auto pl-2 pr-3 py-0 bg-red-400 hover:bg-red-500 font-bold text-sm rounded-md text-white whitespace-nowrap"
            onClick={() => onDelete(id)}
          >
            &times; Remove
          </button>
        </div>
      </div>
    </Card>
);
}
