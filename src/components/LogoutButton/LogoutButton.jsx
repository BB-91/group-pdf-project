import { useAuth0 } from "@auth0/auth0-react";
import "./LogoutButton.scss";

const LogoutButton = ()=>{
    const {logout, user, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <button className="button logout-button" onClick={()=>logout()}>
                Sign Out
         </button>
        )
    )
}
export default LogoutButton;