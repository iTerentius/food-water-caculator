import Input from "./Input";
import Output from "./Output"
import Card from "./Card"

export default function FoodItem({id, desc, cals, servs, num, onDelete, onUpdate}){
  const totalCalories = cals * servs * num;
  return(
    <Card className="flex flex-col">
      <div className="food-item flex flex-col md:flex-row gap-3 items-start md:items-end md:justify-evenly">
        <Input
          placeholder="enter description"
          grow
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
