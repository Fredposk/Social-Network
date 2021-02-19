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
            friends: state.friends.filter(
                (friend) => friend.id !== action.friends
            ),
        };
    }
    if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id == action.newFriend) {
                    friend.accepted = true;
                    return friend;
                } else {
                    return friend;
                }
            }),
        };
    }

    return state;
}
