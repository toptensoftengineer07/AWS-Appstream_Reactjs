const prodConfig = {
	apiEndpoint			: process.env.REACT_APP_API_ENDPOINT,
	guacEndpoint		: process.env.REACT_APP_GUAC_ENDPOINT,
};

const devConfig = {
	apiEndpoint			: process.env.REACT_APP_API_ENDPOINT,
	guacEndpoint		: process.env.REACT_APP_GUAC_ENDPOINT,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
