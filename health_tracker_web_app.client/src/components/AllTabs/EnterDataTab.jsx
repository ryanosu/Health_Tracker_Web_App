import AddFoodComponent from "../AddFoodComponent";
import GridComponent from "../GridComponent";
import CallApiComponent from "../CallApiComponent";

const EnterDataTab = () => {
  return (
    <div className="EnterDataTab">
      <CallApiComponent />
      <AddFoodComponent />
      <GridComponent />
    </div>
  );
};
export default EnterDataTab;