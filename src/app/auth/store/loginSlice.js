import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import API from 'app/services/guacamoleAPI';
import qs from 'qs';
import { setUserData } from './userSlice';

export const submitLogin = ({ email, password }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(email, password)
		.then(user => {
			dispatch(setUserData(user));

			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error));
		});
};

export const submitLoginWithFireBase = ({ username, password }) => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	return firebaseService.auth
		.signInWithEmailAndPassword(username, password)
		.then(() => {
			return dispatch(loginSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				username: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(loginError(response));
		});
};

export const submitLoginWithGuacamole = ({ username, password, remember }) => async dispatch => {
	const config = {
		headers: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
	};
	const data = qs.stringify({
		username: username,
		password: password
	});
	return API.post('/tokens', data, config)
		.then((response) => {
			return dispatch(loginSuccess({ auth: response.data }));
		})
		.catch(error => {
			if (error.code !== 200) {
				dispatch(showMessage({ message: error.message }));
			}
		});
};


const initialState = {
	authToken: '',
	username: '',
	dataSource: '',
	success: false,
	error: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.authToken = action.payload.auth.authToken
			state.username = action.payload.auth.username
			state.dataSource = action.payload.auth.dataSource
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
