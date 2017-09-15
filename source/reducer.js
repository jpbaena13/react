const initialState = {
	posts: {
		page: 1,
		entities: []
	},
	comments: [],
	users: {}
};

function reducer(state = initialState, action = {}) {
	switch(action.type) {
		case 'SET_POST':
			return Object.assign({}, state, {
				posts: Object.assign({}, state.posts, {
					entities: state.posts.entities.concat(action.payload)
				})
			});	

			break;

		default:
			return state;
	}

	return state;
}

export default reducer;