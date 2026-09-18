import { useEffect, useState } from "react";
import { formatNumber } from "../utility/utils";

export default function Input({
  label,
  type,
  grow=false,
  placeholder,
  value,
  inputMode="decimal",
  alignment="center",
  labelPlace="left",
  onChange
}){

  const [rawVal, setRawVal] = useState(value);
  const [displayVal, setDisplayVal] = useState(value);

  function handleFocus(e){
    setDisplayVal(rawVal);
    e.target.value = rawVal;
    e.target.select();
  }

  function handleChange(e) {
    const val = type === 'number'
      ? e.target.value.replace(/[^0-9.]/g, '')
      : e.target.value;
    setRawVal(val);
    setDisplayVal(val);
    onChange(val);
  }

  function handleBlur(){
    if(type !== 'number') return;
    setDisplayVal(formatNumber(rawVal));
  }

  useEffect(()=>{
    setRawVal(value);
    setDisplayVal(isNaN(value) ? value : formatNumber(value));
  },[]);

  return(
    <div className={`flex ${labelPlace === "left" ? "" : "flex-col"} ${grow ? "flex-1" : "shrink-0"} gap-2 justify-${alignment} items-${alignment} text-left`}>
      <label>{label}</label>
      <div className="">
        <input
          className={`px-2 py-1 border border-gray-300 bg-white rounded-md ${grow ? "md:w-full" : "md:w-24"}`}
          placeholder={placeholder ? placeholder : 'enter value'}
          type="text" 
          inputMode={inputMode}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={displayVal}
          />
      </div>
    </div>
  );
}
