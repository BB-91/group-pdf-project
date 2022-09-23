import './DateDropdown.scss'

const DateDropdown = (props) => {

    const {files,
        dateResults,
        setDateResults,
        profileYear,
        setProfileYear} = props

    const searchYear = files.filter((file) => {
        return file.cohort_year == dateResults
    })

    const handleChange = (event) => {
        setDateResults(parseInt(event.target.value))
        setProfileYear(searchYear)
    }

    return (
        <>
        <select value={dateResults} onChange={handleChange}>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
        </select>
        </>
    )
}

export default DateDropdown;