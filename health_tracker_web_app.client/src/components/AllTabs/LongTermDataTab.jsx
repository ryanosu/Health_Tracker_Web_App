import { LongTermData } from "../../longTermData";
import LineChart from "../LineChart";
import { useState } from "react";

const LongTermDataTab = () => {

  const [userLongTermData, setUserLongTermData] = useState({
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

    return (
      <>
       <div className='linechart' style={{height:'700px',width:'700px'}}><LineChart chartData={userLongTermData}/></div> 
      </>
    );
  };
  export default LongTermDataTab;