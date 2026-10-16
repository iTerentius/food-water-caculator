type OutputProps = {
  label: string
  value: string | number
  className: string
}

export default function Output({label, value, className}: OutputProps){
  return(
    <div className="flex gap-2 justify-center items-center">
      <label className={className}>{label}</label>
      <span className={`${className} font-bold m-0`}>
        {value || 0}
      </span>
    </div>
  );
}
