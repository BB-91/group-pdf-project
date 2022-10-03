import "./FilterCheckBoxes.scss";
import {useRef} from 'react';

const FilterCheckboxes = (props) => {
    const {checkResults, setCheckResults, profiles} = props;
    const checkboxesWrapper = useRef(null);
    const checkboxesRef = useRef([]);

    const handleCheckboxClick = () => {
        if (!checkboxesRef.current.length) {
            checkboxesRef.current = Array.from(checkboxesWrapper.current.children).filter(element => element.type === "checkbox");
        }

        const checkboxes = checkboxesRef.current;
        const _checkedCountryNames = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);

        if (!_checkedCountryNames.length) {
            setCheckResults(profiles);
        } else {
            const filteredProfiles = profiles.filter(profile => _checkedCountryNames.includes(profile.country))
            setCheckResults(filteredProfiles);
        }
    }

    return (
        <div ref={checkboxesWrapper} title="checkBoxes">
            <input name="US" type="checkbox" onClick={handleCheckboxClick}/>US
            <input name="UK" type="checkbox" onClick={handleCheckboxClick}/>UK
            <input name="AU" type="checkbox" onClick={handleCheckboxClick}/>AU
        </div>
    )

}

export default FilterCheckboxes;