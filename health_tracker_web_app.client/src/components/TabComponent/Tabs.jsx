import { useState } from "react";
import TodaysDataTab from "../AllTabs/TodaysDataTab";
import LongTermDataTab from "../AllTabs/LongTermDataTab";
import EnterDataTab from "../AllTabs/EnterDataTab";

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState("TodaysDataTab");
  const handleTab1 = () => {
    setSelectedTab("TodaysDataTab");
  };
  const handleTab2 = () => {
    setSelectedTab("EnterDataTab");
  };
  const handleTab3 = () => {
    setSelectedTab("LongTermDataTab");
  };

  return (
    <div className="Tabs">

      <ul className="nav">
        <li className={selectedTab === "TodaysDataTab" ? "selected" : ""} onClick={handleTab1}>Today`s Data</li>
        
        <li className={selectedTab === "EnterDataTab" ? "selected" : ""} onClick={handleTab2}>Enter Data</li>

        <li className={selectedTab === "LongTermDataTab" ? "selected" : ""} onClick={handleTab3}>Long-Term Data</li>
      </ul>
 
      <div className="outlet">
        {selectedTab === "TodaysDataTab" ? <TodaysDataTab /> : selectedTab === "EnterDataTab" ? <EnterDataTab /> : <LongTermDataTab />}
      </div>

    </div>
  );
};

export default Tabs;