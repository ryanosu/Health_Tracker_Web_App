import { useState } from "react";

const AddFoodComponent = ({sendReload, receivedUserID}) => {

    const [food, setFood] = useState({
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
            console.log("LOOK HERE: ", {...prev, [name]: value})
            return {...prev, [name]: value}
        })
    }

    const handleReload = () => {
        // Call the onReload function passed down from the parent
        console.log("AddFoodComponent: Reload sequence #2")
        sendReload();
    };

    const handleButtonClick = async (e) => {

        // stop site reload
        e.preventDefault()
        console.log("handleButtonClick: ", food)
        await fetch("https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(food)
        }).then(()=>{
            console.log("AddFoodComponent: Reload sequence #1")
            handleReload()
        }).catch(error => {
            console.error('Error (POST Request):', error.message);
        })        
    };

    return ( 
        <div className="add-food-component-container">
        <div className="add-or-edit">Add Food</div>
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

export default AddFoodComponent;