export default function Input({
  label, 
  type,
  w=20,
  placeholder,
  value, 
  alignment="center", 
  labelPlace="left", 
  onChange
}){
  return(
    <div className={`flex ${labelPlace === "left" ? "" : "flex-col"} gap-2 justify-${alignment} items-${alignment} text-left`}>
      <label htmlFor="numPersons">{label}</label>
      <div className="">
        <input 
          className={`px-2 py-1 border rounded-md max-w-${w}`}
          placeholder={placeholder ? placeholder : 'enter value'}
          type={type} 
          onChange={onChange}
          value={value}
          />
      </div>
    </div>
  );
}
