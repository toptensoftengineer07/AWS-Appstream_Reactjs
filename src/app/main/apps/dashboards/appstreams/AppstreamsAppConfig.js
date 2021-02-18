import React from 'react';

const AppstreamsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/appstreams/apps',
			component: React.lazy(() => import('./AppstreamsApp'))
		}
	]
};

export default AppstreamsAppConfig;
