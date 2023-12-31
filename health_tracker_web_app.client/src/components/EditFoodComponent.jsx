import { useState } from "react"

function EditFoodComponent({sendReloadEdit, editFoodId, receivedUserID}) {
    const [food, setFood] = useState({
        food_id: editFoodId,
        name: "",
        fat: "",
        protein: "",
        carbs: "",
        calories: "",
        users_id: receivedUserID
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFood((prev) =>{
            return {...prev, [name]: value}
        })
    }

    const handleReload = () => {
        // Call the onReload function passed down from the parent
        console.log("EditFoodComponent: Reload sequence #2")
        sendReloadEdit(0);
    };

    const handleButtonClick = async (e) => {

        // stop site reload
        e.preventDefault()
        
        await fetch("https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(food)
        }).then(()=>{
            console.log("EditFoodComponent: Reload sequence #1")
            handleReload()
        }).catch(error => {
            console.error('Error (PUT Request):', error.message);
        })        
    };

    return ( 
        <div className="add-food-component-container">
        <div className="add-or-edit">Edit Food</div>
            <form>
                <table className="form-container">
                    <td>Name:</td><input type="text" name="name" onChange={handleChange} required></input>
                    <td>Fat:</td><input type="number" name="fat" onChange={handleChange} required></input>
                    <td>Protein:</td><input type="number" name="protein" onChange={handleChange} required></input>
                    <td>Carbs:</td><input type="number" name="carbs" onChange={handleChange} required></input>
                    <td>Calories:</td><input type="number" name="calories" onChange={handleChange} required></input>
                    <td><button type="submit" className="add-food-button" onClick={handleButtonClick}>Submit</button></td>
                </table>
            </form>

        </div>
    )
}

export default EditFoodComponent