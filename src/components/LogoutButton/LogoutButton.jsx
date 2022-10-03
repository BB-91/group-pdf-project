import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = ()=>{
    const {logout,isAuthenticated} = useAuth0();
    // const {logout, user, isAuthenticated} = useAuth0();

    // const DEBUG_LOG_USER = () => {
    //     if (isAuthenticated) {
    //         console.log("user:", user);
    //     } else {
    //         console.log("can't authenticate user.")
    //     }

    //     return isAuthenticated;
    // }

    // return (
    //     isAuthenticated && DEBUG_LOG_USER() (
            
    //         <button onClick={()=>logout()}>
    //             Sign Out
    //      </button>
    //     )
    // )

    return (
        isAuthenticated && (
            
            <button onClick={()=>logout()}>
                Sign Out
         </button>
        )
    )
}
export default LogoutButton;