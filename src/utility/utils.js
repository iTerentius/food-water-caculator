
  export function formatNumber(num) {
    const val = parseFloat(num);
    if(!isNaN(val)) {
      return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(val);
    } else {
      return num;
    }
  }

  export function daysOfWater(people, water) { 
    return water / people; 
  }

  export function daysOfFood(data ) { 
    return data.foodItems?.reduce(
    (total, food) => total + food.cals * food.servs * food.num / (data.numPeople * 2000 ), 0);
  }

  export function totalCalories(cals, servs, num){
    return formatNumber(cals * servs * num);
  } 

  export function totalStoredCalories(data){
    let totalCals =  data.foodItems?.reduce(
    (total, food) => total + (food.cals * food.servs * food.num), 0);
    return formatNumber(totalCals);
  }


