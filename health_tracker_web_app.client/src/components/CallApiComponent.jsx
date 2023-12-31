import { useState, useEffect, useRef } from "react"

function CallApiComponent({receivedUserID, sendReload}) {

  const [searchValue, setSearchValue] = useState('')

  const [loading, setLoading] = useState(false);

  const [consequence, setConsequence] = useState(null)

  const foodRef = useRef({
    name: "Peaches",
    fat: "1",
    protein: "2",
    carbs: "3",
    calories: "4",
    users_id: receivedUserID
  })

  // Function to handle changes in the search field
  const handleSearchChange = async (e) => {setSearchValue(e.target.value);};

  const handleClickFirstApiData = async (e) => {
    // stop site reload
    e.preventDefault()
    const body = {
      'query': searchValue,
      'pageSize': 1
    }
    try{
      setLoading(true)
      const resp = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${import.meta.env.VITE_NUTRITION_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify(body)
      })
      await resp.json().then((respBack)=>{
        respBack = respBack["foods"][0]["foodNutrients"]
        let respProtein;
        let respCarbs;
        let respFat;
        let respCalories;
        let lenRespBack = respBack.length
        for(let i=0; i<lenRespBack; i++){
          if(!respProtein || !respCarbs || !respFat || !respCalories){
            if (respBack[i]["nutrientName"] === "Protein") respProtein = respBack[i]["value"]
            if (respBack[i]["nutrientName"] === 'Total lipid (fat)') respFat = respBack[i]["value"]
            if (respBack[i]["nutrientName"] === 'Carbohydrate, by difference') respCarbs = respBack[i]["value"]
            if (respBack[i]["nutrientName"] === 'Energy') respCalories = respBack[i]["value"]
          }
        }
        foodRef.current = ({
          name: searchValue,
          fat: respFat,
          protein: respProtein,
          carbs: respCarbs,
          calories: respCalories,
          users_id: receivedUserID
        })
      })
      await handlePostRequestToOurDatabase()
    }
    catch(error){
      console.error('Error (Nutrition API Request):', error.message)
      setConsequence({ success: false });
    }
    finally {
      setLoading(false);
    }
  }

  const handlePostRequestToOurDatabase = async () => {
    let food = {
      name: searchValue,
      fat: String(foodRef.current.fat),
      protein: String(foodRef.current.protein),
      carbs: String(foodRef.current.carbs),
      calories: String(foodRef.current.calories),
      users_id: receivedUserID
    }
    console.log(food)

    await fetch("https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food)
      }).then(()=>{
        setConsequence({ success: true });
        sendReload()
      }).catch(error => {
        console.error('Error (POST Request):', error.message);
      })
  }

  return (
    <div className="call-api-component-container">

      <form>
        <table className="call-api-component-form-container">
        <div className="callApiComponent-title">Call API</div>

        <div className="loading-consequence">
        {loading && <p>Loading...</p>}
        {consequence && (
            <div>
              {consequence.success ? (
                <p>Success!</p>
              ) : (
                <p>Failed! Error: Could not find that food.</p>
              )}
            </div>
          )
        }
        </div>
                        
          <td>Food Name:</td><input type="text" onChange={handleSearchChange} required></input>
          <td><button className="call-api-component-button" onClick={(e) => {handleClickFirstApiData(e)}}>Search</button></td>
                    
        </table>
      </form>

    </div>
  )
}

export default CallApiComponent