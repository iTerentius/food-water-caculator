import Input from "./Input";
import Output from "./Output"
import Card from "./Card"

export default function FoodItem({id, desc, cals, servs, num, onDelete, onUpdate}){
  const totalCalories = cals * servs * num;
  return(
    <Card className="flex flex-col">
      <div className="food-item flex flex-row gap-3 items-end justify-between flex-wrap">
        <Input
          placeholder="enter description"
          w="30"
          alignment="left"
          label="Food Item Description" 
          type="text" 
          labelPlace="top" 
          value={desc}
          onChange={(e) => onUpdate(id, {desc: e.target.value})}
        />
        <Input 
          label="Cal. per Serving" 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={cals}
          onChange={(e) => onUpdate(id, {cals: e.target.value})}
        />
        <Input 
          label="Serv. per Cont." 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={servs}
          onChange={(e) => onUpdate(id, {servs: e.target.value})}
        />
        <Input 
          label="# of Containers" 
          alignment="left"
          type="number" 
          labelPlace="top" 
          value={num}
          onChange={(e) => onUpdate(id, {num: e.target.value})}
        />
        <button 
          className="px-2 py-1 mt-8 bg-red-700 rounded-md text-white font-bold"
          onClick={() => onDelete(id)}
        >
          &times;
        </button>
      </div>
      <Output label="Total Item Calories:" type="float" value={totalCalories} />
    </Card>
);
}
