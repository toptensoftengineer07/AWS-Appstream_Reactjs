import React from 'react';

const CloudApplicationsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/appstreams',
			component: React.lazy(() => import('./CloudApplications'))
		}
	]
};

export default CloudApplicationsConfig;
