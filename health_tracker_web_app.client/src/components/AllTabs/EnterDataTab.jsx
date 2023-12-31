import AddFoodComponent from "../AddFoodComponent";
import GridComponent from "../GridComponent";
import CallApiComponent from "../CallApiComponent";
import { useState, useEffect } from "react";
import EditFoodComponent from "../EditFoodComponent";

const EnterDataTab = ({receivedUserID}) => {

  const [parentState, setParentState] = useState(0);

  const handleChangeParentState = () => {
     // Toggle the state to trigger a re-render of the children
     setParentState((prev)=>{prev+1});
     //console.log("EnterDataTab: handleChangeParentState function triggered for Reload sequence #3. parentState: ", parentState)
  };

  useEffect(() => {
    //console.log("EnterDataTab: useEffect parentState Re-render triggered. parentState: ", parentState);
  },[parentState]);

  const [editFoodId, setEditFoodId] = useState(0)

  const handleChangeParentStateEdit = (food_id) => {
    setEditFoodId(food_id)
    //console.log("EnterDataTab: handleChangeParentStateEdit function triggered. editFoodId: ", editFoodId)
  }

  useEffect(() => {
    //console.log("EnterDataTab: useEffect editFoodId Re-render triggered. editFoodId: ", editFoodId);
  },[editFoodId]);

  return (
    <div className="EnterDataTab">
      <CallApiComponent receivedUserID={receivedUserID} sendReload={handleChangeParentState}/>
      {editFoodId === 0 ? <AddFoodComponent sendReload={handleChangeParentState} receivedUserID={receivedUserID}/> : <EditFoodComponent sendReloadEdit={handleChangeParentStateEdit} editFoodId={editFoodId} receivedUserID={receivedUserID}/>}
      <GridComponent parentState={parentState} handleChangeParentStateEdit={handleChangeParentStateEdit} editFoodId={editFoodId} receivedUserID={receivedUserID}/>
    </div>
  );
};
export default EnterDataTab;