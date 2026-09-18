import { twMerge as tm } from "tailwind-merge"
export default function Card({children, className}){
  return <div className={tm("space-y-5 py-2 px-4 mb-5 bg-gray-400/10 rounded-lg", className)}>{children}</div>
}
