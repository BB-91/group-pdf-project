import './DateDropdown.scss'

const DateDropdown = (props) => {

    const { profiles, dateResults, setDateResults, profileYear, setProfileYear } = props

    const handleChange = (event) => {
        setDateResults(event.target.value);
    }

    return (
        <>
            <select title="select" value={dateResults} onChange={handleChange}>
                <option name="all" value="all">All</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
        </>
    )
}

export default DateDropdown;