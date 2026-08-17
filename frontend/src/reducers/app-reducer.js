import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLoggedOut: false,
	modal: {
		isOpen: false,
		title: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLoggedOut: !state.wasLoggedOut,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
