import BarChart from "../BarChart";
import PieChart from "../PieChart";
import { UserData } from "../../Data";
import { PieData } from "../../PieData";
import { useState } from "react";

const TodaysDataTab = () => {

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

  return (
    <>
      <div className='barchart' style={{height:'700px',width:'700px'}}><BarChart chartData={userData}/></div>

      <div className='piechart' style={{height:'700px',width:'700px'}}><PieChart chartData={userDataPie}/></div>
    </>
  );
};
export default TodaysDataTab;