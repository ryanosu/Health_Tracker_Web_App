import BarChart from "../BarChart";
import PieChart from "../PieChart";
import { UserData } from "../../Data";
import { PieData } from "../../PieData";
import { useEffect, useState } from "react";

const TodaysDataTab = ({receivedUserID}) => {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.category),
    datasets: [{
        label: "Today's Statistics",
        data: UserData.map((data) => data.count),
        borderWidth: 5,
        borderColor: "blue",
        backgroundColor: 'rgba(75,192,192,0.5)',
    }]
  })

  const [userDataPie, setUserDataPie] = useState({
    labels: PieData.map((data) => data.category),
    datasets: [{
        label: "Today's Statistics",
        data: PieData.map((data) => data.count),
        backgroundColor: ['red', 'pink', 'green']
    }]
  })

  const getTodaysData = async (receivedUserID) => {
    try{
      console.log("receivedUserID: ", receivedUserID)
      const response = await fetch(`https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/users/${receivedUserID}`);
      const returnData = await response.json();
        //console.log("returnData: ", returnData)
        let totalFat = 0
        let totalCarbs = 0
        let totalProtein = 0
        let totalCalories = 0
        let totalList = returnData.length
        for(let i=0; i<totalList; i++){
          totalFat += returnData[i].fat
          totalCarbs += returnData[i].carbs
          totalProtein += returnData[i].protein
          totalCalories += returnData[i].calories
        }
        setUserData({
          labels: ['fat', 'carbs', 'protein', 'calories'],
          datasets: [{
            label: "Today's Statistics",
            data: [totalFat, totalCarbs, totalProtein, totalCalories],
            borderWidth: 5,
            borderColor: "blue",
            backgroundColor: 'rgba(75,192,192,0.5)',
          }]
        })
        setUserDataPie({
          labels: ['fat', 'carbs', 'protein'],
          datasets: [{
            label: "Today's Statistics",
            data: [totalFat, totalCarbs, totalProtein],
            backgroundColor: ['red', 'pink', 'green']
          }]
        })
    }
    catch(error){
      console.error('Error (TodaysDataTab: GET Request):', error.message)
    }
    // setUserData({
    //   labels: ['fat', 'carbs', 'protein', 'calories'],
    //   datasets: [{
    //       label: "Today's Statistics",
    //       data: [1, 4, 3, 5],
    //       borderWidth: 5,
    //       borderColor: "blue",
    //       backgroundColor: 'rgba(75,192,192,0.5)',
    //   }]
    // })
  }

  useEffect(()=>{
    getTodaysData(receivedUserID)
  },[])

  return (
    <>
      <div className='barchart' style={{height:'700px',width:'700px'}}><BarChart chartData={userData}/></div>

      <div className='piechart' style={{height:'700px',width:'700px'}}><PieChart chartData={userDataPie}/></div>
    </>
  );
};
export default TodaysDataTab;