import { useState } from "react";
import TodaysDataTab from "../AllTabs/TodaysDataTab";
import SecondTab from "../AllTabs/SecondTab";
import LongTermDataTab from "../AllTabs/LongTermDataTab";

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState("TodaysDataTab");
  const handleTab1 = () => {
    setSelectedTab("TodaysDataTab");
  };
  const handleTab2 = () => {
    setSelectedTab("tab2");
  };
  const handleTab3 = () => {
    setSelectedTab("LongTermDataTab");
  };

  return (
    <div className="Tabs">

      <ul className="nav">
        <li className={selectedTab === "TodaysDataTab" ? "selected" : ""} onClick={handleTab1}>Today`s Data</li>
        
        <li className={selectedTab === "tab2" ? "selected" : ""} onClick={handleTab2}>Tab 2</li>

        <li className={selectedTab === "LongTermDataTab" ? "selected" : ""} onClick={handleTab3}>Long-Term Data</li>
      </ul>
 
      <div className="outlet">
        {selectedTab === "TodaysDataTab" ? <TodaysDataTab /> : selectedTab === "tab2" ? <SecondTab /> : <LongTermDataTab />}
      </div>

    </div>
  );
};

export default Tabs;