const COUNTRIES_OBJ = {
    "US": {
        fullName: 'United States of America',
        regionAlias: "State",
        regions: [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'District of Columbia',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming',
        ]
    },
    "AU": {
        fullName: 'Australia',
        regionAlias: "Region",
        regions: [
            'New South Wales',
            'Queensland',
            'South Australia',
            'Western Australia',
            'Tasmania',
            'Victoria',
            'Northern Territory',
            'Australian Capital Territory',
        ]
    },
    "UK": {
        fullName: 'United Kingdom',
        regionAlias: "Region",
        regions: [
            'England',
            'Northern Ireland',
            'Scotland',
            'Wales',
        ]
    }
}

const COUNTRY_ABBREVIATIONS = Object.keys(COUNTRIES_OBJ);

const COUNTRY_OPTIONS_ELEMENTS = COUNTRY_ABBREVIATIONS.map((countryAbbreviation, index) => {
    return <option value={countryAbbreviation} key={index}>{countryAbbreviation}</option>
})

const assertIsCountryAbbreviation = (countryAbbreviation) => {
    if (!COUNTRY_ABBREVIATIONS.includes(countryAbbreviation)) {
        throw new Error(`Invalid country abbreviation: ${countryAbbreviation}`);
    }
}

const getCountryObj = (countryAbbreviation) => {
    assertIsCountryAbbreviation(countryAbbreviation);
    return COUNTRIES_OBJ[countryAbbreviation]; 
}

const getRegionElements = (countryAbbreviation) => {
    const regions = getCountryObj(countryAbbreviation).regions;
    const regionElements = regions.map((region, index) => {
        return <option value={region} key={index}>{region}</option>
    });

    return regionElements;
}

export { COUNTRIES_OBJ, COUNTRY_ABBREVIATIONS, COUNTRY_OPTIONS_ELEMENTS, getRegionElements };