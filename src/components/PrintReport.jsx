import { formatNumber, daysOfWater, daysOfFood, totalCalories, totalStoredCalories } from "../utility/utils";

export default function PrintableReport({ data, ref }) {
  const { numPeople, galsWater, foodItems } = data;
  const daysWater = formatNumber(daysOfWater(data.numPeople, data.galsWater));
  const daysFood = formatNumber(daysOfFood(data));

  return (
    <div ref={ref} className="print-report print-only p-6 bg-white text-black">
      <h2 className="text-xl font-bold mb-4 text-center">Food & Water Storage Summary</h2>

      {/* Overview Totals Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border mb-6 text-center bg-gray-50">
        <div>
          <span className="block text-xs text-gray-500">Household Size</span>
          <strong className="text-base">{numPeople || 0} {numPeople <= 1 ? "Person" : "People"}</strong>
        </div>
        <div>
          <span className="block text-xs text-gray-500">Stored Water</span>
          <strong className="text-base">{galsWater} Gals</strong>
        </div>
        <div>
          <span className="block text-xs text-gray-500">Water Supply</span>
          <strong className="text-base">{daysWater} Days</strong>
        </div>
        <div>
          <span className="block text-xs text-gray-500">Food Supply</span>
          <strong className="text-base">{daysFood} Days</strong>
        </div>
      </div>

      {/* Itemized Inventory Table */}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-2">Item Description</th>
            <th className="py-2 text-right">Cal / Serving</th>
            <th className="py-2 text-right">Serv. / Cont.</th>
            <th className="py-2 text-right">Containers</th>
            <th className="py-2 text-right">Total Calories</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2">{item.desc || '—'}</td>
              <td className="py-2 text-right">{formatNumber(item.cals)}</td>
              <td className="py-2 text-right">{formatNumber(item.servs)}</td>
              <td className="py-2 text-right">{formatNumber(item.num)}</td>
              <td className="py-2 text-right font-medium">
                {totalCalories(item.cals, item.servs, item.num)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-black font-bold">
            <td colSpan="4" className="py-3 text-right">Total Stored Calories:</td>
            <td className="py-3 text-right">
              {totalStoredCalories(data)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
