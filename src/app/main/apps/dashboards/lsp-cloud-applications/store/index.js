import { combineReducers } from '@reduxjs/toolkit';
import cloudApplications from './cloudApplicationsSlice';
import login from 'app/auth/store/loginSlice';

const reducer = combineReducers({
	cloudApplications,
	login
});

export default reducer;
