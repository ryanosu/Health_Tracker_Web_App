import { useEffect, useState } from "react";

const GridComponent = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // GET request by default
      const response = await fetch('https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food');
        
      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const result = await response.json();
      setData(result)
    }
      
    catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array === effect runs once after the initial render

  const handleDelete = async (food_id) => {

    try {
      const deleteResponse = await fetch(`https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food/${food_id}`, {
        method: 'DELETE',
      });

      if (!deleteResponse.ok) {
        throw new Error('Delete request failed');
      }

      // Trigger a re-fetch of data after successful deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  return (
    <div>
      <table className="grid-container">
        
        <tr>
          <th className="grid-cell">Name</th>
          <th className="grid-cell">Fat</th>
          <th className="grid-cell">Carbs</th>
          <th className="grid-cell">Protein</th>
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
              <td className="grid-cell"><button onClick={() => handleDelete(val.food_id)}>Delete</button></td>
            </tr>
          )
        })}

      </table>
    </div>
  );
};

export default GridComponent;