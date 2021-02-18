const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "RETURNED_FRIENDS_LIST":
            return { ...state, friends: action.friends };
        case "UNFRIEND":
            return {
                ...state,
                friends: state.friends.filter((friend) => {
                    friend.id === action.unfriend;
                }),
            };
        case "ACCEPT_FRIEND":
            return {
                ...state,
                friends: state.friends.map((friend) =>
                    friend.id === action.newFriend
                        ? (state.friends.accepted = true)
                        : ""
                ),
            };
        default:
            return state;
    }
};
