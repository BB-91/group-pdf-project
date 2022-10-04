import { useAuth0 } from "@auth0/auth0-react";
import "./login-button.scss";

const LoginButton = ()=>{
    const {loginWithRedirect,isAuthenticated} = useAuth0();
    
    return(
        !isAuthenticated && (
            <button className="button login-button" onClick={()=>loginWithRedirect()}>
                Sign In
         </button>
        )
        
    )
}
export default LoginButton;