import type { StoredData } from "../App";

export function formatNumber(num: number | string): string {
  const val = typeof num === 'number' ? num : parseFloat(num);
  if(!isNaN(val)) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
  } else {
    return String(num);
  }
}

export function daysOfWater(people: number, water: number) { 
  return water / people; 
}

export function daysOfFood(data: StoredData ) { 
  return data.foodItems?.reduce(
  (total, food) => total + food.cals * food.servs * food.num / (data.numPeople * 2000 ), 0);
}

export function totalCalories(cals: number, servs: number, num: number){
  return formatNumber(cals * servs * num);
} 

export function totalStoredCalories(data: StoredData){
  let totalCals =  data.foodItems?.reduce(
  (total, food) => total + (food.cals * food.servs * food.num), 0);
  return formatNumber(totalCals);
}


