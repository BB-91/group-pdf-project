import "./LogoutButton.scss";

const LogoutButton = (props)=>{
    const { useAuth0, setLoggedIn } = props;
    const {logout, isAuthenticated } = useAuth0();

    const handleLogoutButtonClick = async () => {
        logout(setLoggedIn(false));
    }

    return (
        isAuthenticated && (
            <button className="button logout-button" onClick={handleLogoutButtonClick}>
                Sign Out
         </button>
        )
    )
}
export default LogoutButton;