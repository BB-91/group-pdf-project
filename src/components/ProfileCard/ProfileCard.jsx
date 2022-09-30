const ProfileCard = (props) =>{
    const {city, state, zipCode, country, cohort_year, firstName, lastName } = props;


return (
    <>
                <p>{firstName} {lastName}</p>
                <p>{city}, {state}, {zipCode}, {country}</p>
                <p>{cohort_year}</p>
                <button>Remove</button>
    </>
)

}

export default ProfileCard