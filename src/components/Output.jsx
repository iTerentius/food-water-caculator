export default function Output({label, type, value}){
  return(
    <div className="flex gap-2 justify-center items-center">
      <label>{label}</label>
      <span className="text-xl font-bold m-0">
        {value}
      </span>
    </div>
  );
}
