import { useState } from "react";

const AddFoodComponent = ({onReload}) => {

    const [food, setFood] = useState({

        name: "",
        fat: "",
        protein: "",
        carbs: "",
        calories: "",
        users_id: 1
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFood((prev) =>{
            return {...prev, [name]: value}
        })
    }

    const handleButtonClick = async (e) => {

        // stop site reload
        e.preventDefault()
        
        try {
            
            const postResponse = await fetch("https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(food)
            });

            const postResponseJson = await postResponse.json();
            console.log("postResponse:", postResponseJson)

            onReload()
      
            if (!postResponse.ok) {
              throw new Error('POST request failed');
            }            
          } 
          
          catch (error) {
            console.error('Error posting data:', error.message);
        }
    };

    return (
        <div className="add-food-component-container">

            <form>
                <table className="form-container">
                        
                    <td>Name:</td>
                        <input type="text" name="name" onChange={handleChange} required></input>

                    <td>Fat:</td>
                        <input type="number" name="fat" onChange={handleChange} required></input>

                    <td>Protein:</td>
                        <input type="number" name="protein" onChange={handleChange} required></input>

                    <td>Carbs:</td>
                        <input type="number" name="carbs" onChange={handleChange} required></input>

                    <td>Calories:</td>
                        <input type="number" name="calories" onChange={handleChange} required></input>

                    <td><button type="submit" className="add-food-button" onClick={handleButtonClick}>Add Food</button></td>
                       
                </table>
            </form>

        </div>
    )
}

export default AddFoodComponent;