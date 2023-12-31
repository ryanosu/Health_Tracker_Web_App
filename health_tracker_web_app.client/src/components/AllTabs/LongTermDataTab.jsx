import { LongTermData } from "../../LongTermData";
import LineChart from "../LineChart";
import { useEffect, useState } from "react";

const LongTermDataTab = ({receivedUserID}) => {

  const [userLongTermData, setUserLongTermData] = useState({
    // default
    labels: LongTermData.map((data) => data.date),
    datasets: [
      {
        label: "Fat",
        data: LongTermData.map((data) => data.fatCount.count),
        borderColor: "Pink"
      },
      {
        label: "Carbs",
        data: LongTermData.map((data) => data.carbsCount.count),
        borderColor: "Green"
      },
      {
        label: "Protein",
        data: LongTermData.map((data) => data.proteinCount.count),
        borderColor: "Red"
      },
      {
        label: "Calories",
        data: LongTermData.map((data) => data.caloriesCount.count),
        borderColor: "Yellow"
      }
    ]
  })

  const handleLongTermData = async (receivedUserID) => {
    try{
      const response = await fetch(`https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/users/${receivedUserID}`);
      //console.log("LongTermDataTab response: ", response)
      const returnData = await response.json();
      //console.log("LongTermDataTab returnData: ", returnData)

      // fix the dates
      returnData.map((item)=>{
        let currentDate = new Date(item.date)
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth() + 1
        let day = currentDate.getDate()
        let dateOnlyString = `${year}-${month}-${day}`;
        item.date = dateOnlyString
      })
      //console.log("LongTermDataTab returnData w/ fixed dates: ", returnData)

      let arr = []
      let len_returnData = returnData.length

      // go through all of the returnData
      for(let i=0; i<len_returnData; i++){
        let found = "no"
        let len_arr = arr.length

        // first, check if current object's date already exist in an object in the arr
        for(let j=0; j<len_arr; j++){
          // date match found. add the rest of the data to that object in arr, and then continue
          if(returnData[i].date === arr[j].date){
            arr[j].totalFat += returnData[i].fat
            arr[j].totalCarbs += returnData[i].carbs
            arr[j].totalProtein += returnData[i].protein
            arr[j].totalCalories += returnData[i].calories
            found = "yes"
            break;
          }
        }
        
        // no date match found. it's object still needs to be created
        if(found === "no"){
          arr.push({
            date: returnData[i].date,
            totalFat: returnData[i].fat,
            totalCarbs: returnData[i].carbs,
            totalProtein: returnData[i].protein,
            totalCalories: returnData[i].calories
          })
        }
      }
      //console.log("LongTermDataTab arr: ", arr)

      setUserLongTermData({
        labels:  arr.map((item)=>item.date),
        datasets: [
          {
            label: "Fat",
            data: arr.map((item)=>item.totalFat),
            borderColor: "Pink"
          },
          {
            label: "Carbs",
            data: arr.map((item)=>item.totalCarbs),
            borderColor: "Green"
          },
          {
            label: "Protein",
            data: arr.map((item)=>item.totalProtein),
            borderColor: "Red"
          },
          {
            label: "Calories",
            data: arr.map((item)=>item.totalCalories),
            borderColor: "Yellow"
          }
        ]
      })
    }
    catch(error){
      console.error('Error (LongTermDataTab: GET Request):', error.message)
    }
  }

  useEffect(()=>{
    handleLongTermData(receivedUserID)
  },[])

    return (
      <>
       <div className='linechart' style={{height:'700px',width:'700px'}}><LineChart chartData={userLongTermData}/></div> 
      </>
    );
  };
  export default LongTermDataTab;