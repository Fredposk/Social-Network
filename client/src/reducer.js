export default function reducer(state = {}, action) {
    if (action.type === "RETURNED_FRIENDS_LIST") {
        state = {
            ...state,
            friends: action.friends,
        };
    }

    if (action.type === "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.filter((friend) => friend.id !== action.id),
        };
    }
    if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id === action.id) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    }

    return state;
}
