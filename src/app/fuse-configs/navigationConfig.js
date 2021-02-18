// import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'main',
		title: 'Main',
		translate: 'Main',
		type: 'group',
		icon: 'apps',
		url: '/appstreams'
	},
	{
		id: 'logout',
		title: 'Logout',
		type: 'group',
		icon: 'exit_to_app',
		url: '/logout'
	}
];

export default navigationConfig;
