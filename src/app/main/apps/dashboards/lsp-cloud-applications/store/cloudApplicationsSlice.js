import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import API from 'app/services/guacamoleAPI';

export const getConnections = ({ token }) => async dispatch => {
	return API.get('/session/data/mysql/connections?token=' + token)
		.then((response) => {
			return dispatch(getConnectionsSuccess({ connections: response.data }));
		})
		.catch(error => {
			if (error.code !== 200) {
				dispatch(showMessage({ message: error.message }));
			}
		});
};

const initialState = {
	connections: [],
	success: false,
	error: ''
};

const cloudApplicationsSlice = createSlice({
	name: 'cloudApplicationsSlice/connections',
	initialState,
	reducers: {
		getConnectionsSuccess: (state, action) => {
			state.success = true;
			let data = action.payload.connections;
			let connections = [];
			for (let key in action.payload.connections) {
				connections[data[key].name] = data[key];
			}
			state.connections = connections
		}
	}
});

export const { getConnectionsSuccess } = cloudApplicationsSlice.actions;

export default cloudApplicationsSlice.reducer;
