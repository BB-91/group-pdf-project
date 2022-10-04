import { useEffect } from 'react';
import './DateDropdown.scss'

const DateDropdown = (props) => {

    const { profiles, dateResults, setDateResults, profileYear, setProfileYear } = props

    const update = (year) => {
        console.log("updating year")
        setDateResults(year);
    }

    const handleChange = (event) => {
        // setDateResults(event.target.value);
        update(event.target.value)
        
    }

    useEffect(() => {
        update(2022);
    })

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