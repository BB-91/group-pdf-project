import "./login-button.scss";

const LoginButton = (props)=>{
    const { useAuth0, setLoggedIn } = props;
    const {loginWithRedirect, isAuthenticated } = useAuth0();
    
    const handleLoginButtonClick = async () => {
        const res = await loginWithRedirect();
        console.log("res: ", res);
        setLoggedIn(isAuthenticated);
    }

    return(
        !isAuthenticated && (
            <button className="button login-button" onClick={handleLoginButtonClick}>
                Sign In
         </button>
        )
        
    )
}
export default LoginButton;