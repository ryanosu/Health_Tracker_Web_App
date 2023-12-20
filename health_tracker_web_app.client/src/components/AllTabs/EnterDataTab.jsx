import AddFoodComponent from "../AddFoodComponent";
import GridComponent from "../GridComponent";
import CallApiComponent from "../CallApiComponent";
import { useState } from "react";

const EnterDataTab = () => {

  const [shouldRenderChildren, setShouldRenderChildren] = useState(true);

  const handleReload = () => {
     // Toggle the state to trigger a re-render of the children
     setShouldRenderChildren((prevShouldRender) => prevShouldRender);
  };

  return (
    <div className="EnterDataTab">
      <CallApiComponent />
      <AddFoodComponent onReload={handleReload}/>
      {shouldRenderChildren && <GridComponent />}
    </div>
  );
};
export default EnterDataTab;