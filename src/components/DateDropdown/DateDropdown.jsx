import './DateDropdown.scss'

const DateDropdown = (props) => {

    const { files,
        dateResults,
        setDateResults,
        profileYear,
        setProfileYear } = props

    console.log(typeof files)
    console.log();
    //console.log(`Cohort year : ${files[0].id}`)

    // const Profiles2019 = files.filter((file) => {
    //     return file.cohort_year == 2019
    // })

    // const Profiles2020 = files.filter((file) => {
    //     return file.cohort_year.includes(2020)
    // })

    // const Profiles2021 = files.filter((file) => {
    //     return file.cohort_year.includes(2021)
    // })

    // const Profiles2022 = files.filter((file) => {
    //     return file.cohort_year.includes(2022)
    // })

    const handleChange = (event) => {
        setDateResults(parseInt(event.target.value))
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