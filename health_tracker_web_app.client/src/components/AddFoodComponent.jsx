
const AddFoodComponent = () => {
    return (
        <div className="add-food-component-container">

                <form>
                    <table className="form-container">
                        
                        <td>Name:</td>
                            <input type="text" required></input>

                        <td>Fat:</td>
                            <input type="number" required></input>

                        <td>Protein:</td>
                            <input type="number" required></input>

                        <td>Carbs:</td>
                            <input type="number" required></input>

                        <td>Calories:</td>
                            <input type="number" required></input>

                        <td><button className="add-food-button">Add Food</button></td>
                       
                    </table>
                </form>

        </div>
    )
}

export default AddFoodComponent;