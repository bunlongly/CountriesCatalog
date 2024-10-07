import axios from 'axios';

const URL = 'https://restcountries.com/v3.1/all';

//getting the data from the url
export const fetchCountries = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};


