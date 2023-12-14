// Example of a data array that
// you might receive from an API
const data = [
  { name: "cheeseburger", fat: 19, carbs: 300, protein: 50, calories: 350},
  { name: "banana", fat: 1, carbs: 5, protein: 1, calories: 90},
  { name: "avocado", fat: 19, carbs: 10, protein: 3, calories: 300},
  { name: "ice cream", fat: 80, carbs: 5, protein: 2, calories: 800},
  { name: "steak", fat: 41, carbs: 100, protein: 50, calories: 200},
  { name: "chips", fat: 6, carbs: 700, protein: 1, calories: 350},
  { name: "cod fish", fat: 19, carbs: 30, protein: 20, calories: 200}
]

function GridComponent() {
  return (
    <div>
      <table className="grid-container">
        <tr>
          <th className="grid-cell">Name</th>
          <th className="grid-cell">Fat</th>
          <th className="grid-cell">Protein</th>
          <th className="grid-cell">Carbs</th>
          <th className="grid-cell">Calories</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="grid-cell">{val.name}</td>
              <td className="grid-cell">{val.fat}</td>
              <td className="grid-cell">{val.carbs}</td>
              <td className="grid-cell">{val.protein}</td>
              <td className="grid-cell">{val.calories}</td>
              <td className="grid-cell">Edit</td>
              <td className="grid-cell">Delete</td>
            </tr>
          )
        }
        )}
      </table>
    </div>
  );
}

export default GridComponent;