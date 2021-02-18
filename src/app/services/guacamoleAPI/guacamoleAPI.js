import config from './guacamoleAPIConfig';
import axios from 'axios';

const instance = axios.create({
	// .. where we make our configurations
	baseURL: config.apiEndpoint
});

export default instance;
