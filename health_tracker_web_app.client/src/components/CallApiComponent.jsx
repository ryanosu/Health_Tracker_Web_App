import { useState } from "react"

function CallApiComponent() {

  const [searchValue, setSearchValue] = useState('')

  // Function to handle changes in the search field
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = async (e) => {

    // stop site reload
    e.preventDefault()

    console.log("CallApiComponent: Received Food Name: ", searchValue)

    const body = {
      'query': searchValue,
      'pageSize': 1
    }

    try{
      const resp = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${import.meta.env.VITE_NUTRITION_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify(body)
      })
      await resp.json().then((respBack)=>{
        console.log("respBack: ", respBack)
        respBack = respBack["foods"][0]["foodNutrients"]
        let respProtein;
        let respCarbs;
        let respFat;
        let respCalories;
        let lenRespBack = respBack.length
        console.log("CallApiComponent: Starting to loop through API response")
        for(let i=0; i<lenRespBack; i++){
          if(!respProtein || !respCarbs || !respFat || !respCalories){
            if (respBack[i]["nutrientName"] === "Protein") respProtein = respBack[i]["value"]
            if (respBack[i]["nutrientName"] === 'Total lipid (fat)') respFat = respBack[i]["value"]
            if (respBack[i]["nutrientName"] === 'Carbohydrate, by difference') respCarbs = respBack[i]["value"]
            if (respBack[i]["nutrientName"] === 'Energy') respCalories = respBack[i]["value"]
          }
        }
        console.log("respProtein: ", respProtein)
        console.log("respFat: ", respFat)
        console.log("respCarbs: ", respCarbs)
        console.log("respCalories: ", respCalories)
        })
    }
    catch(error){
      console.error('Error (Nutrition API Request):', error.message)
    }
  }

  return (
    <div className="call-api-component-container">

      <form>
        <table className="call-api-component-form-container">
                        
          <td>Name:</td><input type="text" onChange={handleSearchChange} required></input>
          <td><button className="call-api-component-button" onClick={handleClick}>Search</button></td>
                       
        </table>
      </form>

    </div>
  )
}

export default CallApiComponent