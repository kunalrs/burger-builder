import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burder-c2cdf.firebaseio.com/'
});

export default instance;