import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const LogoutButton = ({handleUserID}) => {
  const { logout, user } = useAuth0();

  const authenticateWithDatabase = async () => {

    let test = user.sub
    let User = {uuid:test}

    await fetch("https://healthtrackerwebappserver20231215171355.azurewebsites.net/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(User)
    }).then((returnVal)=>{
        returnVal.json().then(newVal=>{
          //console.log("users_id returned from database: ", newVal)
          handleUserID(newVal)
        })
    }).catch(error => {
        console.error('Error (authenticateWithDatabase POST Request):', error.message);
    })
  }

  useEffect(()=>{
    setTimeout(() => {}, 2000); // 1000 milliseconds = 1 second
    authenticateWithDatabase()
  },[])

  return (
    <button className="logoutButton" onClick={() => {logout({logoutParams: {returnTo: window.location.origin}}); handleUserID(1)}}>
      Log Out
    </button>
  );
};

export default LogoutButton;