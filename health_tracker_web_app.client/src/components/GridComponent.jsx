import { useEffect, useState } from "react";

const GridComponent = ({parentState, handleChangeParentStateEdit, editFoodId, receivedUserID}) => {
  
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // GET request by default
      const response = await fetch(`https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/users/${receivedUserID}`);
      const result = await response.json();
      setData(result)
    }
    catch (error) {
      console.error('Error (GET Request):', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [parentState, editFoodId]); // Empty dependency array === effect runs once after the initial render

  const handleDelete = async (food_id) => {

    await fetch(`https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food/${food_id}`, {
      method: 'DELETE',
    }).then(()=>{
      // Trigger a re-fetch of data after deletion
      fetchData();
    }).catch(error => {
      console.error('Error (DELETE Request):', error.message);
    })
  }

  const handleEdit = async (food_id) => {
    // going to need a way to handle edits
    //console.log("Trigger handleEdit inside GridComponent")
    handleChangeParentStateEdit(food_id)
  }

  return (
    <div>
      <table className="grid-container">
      <div className="gridComponent-title">Today`s Food</div>
        
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
              <td className="grid-cell"><button type="submit" className="delete-and-edit-food-button" onClick={() => handleEdit(val.food_id)}>Edit</button></td>
              <td className="grid-cell"><button type="submit" className="delete-and-edit-food-button" onClick={() => handleDelete(val.food_id)}>Delete</button></td>
            </tr>
          )
        })}

      </table>
    </div>
  );
};

export default GridComponent;