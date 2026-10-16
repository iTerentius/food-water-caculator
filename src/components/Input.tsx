import { useEffect, useState } from "react";
import { formatNumber } from "../utility/utils";

type InputProps = {
  label?: string
  type?: string
  grow?: boolean
  placeholder?: string
  value: string | number
  inputMode?: "decimal" | "numeric" 
  alignment?: string
  labelPlace?: string
  onChange: (val:string) => void 
}

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
}: InputProps
){

  const [rawVal, setRawVal] = useState(String(value));
  const [displayVal, setDisplayVal] = useState(String(value));

  const strVal = String(value);

  function handleFocus(e: React.ChangeEvent<HTMLInputElement>){
    setDisplayVal(rawVal);
    e.currentTarget.value = rawVal;
    e.currentTarget.select();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    setRawVal(strVal);
    setDisplayVal(Number.isNaN(value) ? strVal : formatNumber(strVal));
  },[]);

  // Tailwind can't see dynamically built class names, so map them explicitly
  const align = alignment === "left"
    ? "justify-start items-start"
    : "justify-center items-center";

  return(
    <div className={`flex ${labelPlace === "left" ? "flex-wrap" : "flex-col"} ${grow ? "w-full md:w-auto md:flex-1" : "shrink-0"} gap-2 ${align} text-left`}>
      <label className={labelPlace === "left" ? "whitespace-nowrap" : ""}>{label}</label>
      <div className={grow ? "w-full" : ""}>
        <input
          className={`px-2 py-1 border border-gray-300 bg-white rounded-md ${grow ? "w-full" : "w-24"}`}
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
