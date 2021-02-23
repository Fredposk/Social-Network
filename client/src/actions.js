import axios from "./components/axios";

export async function getFriendsList() {
    const response = await axios.get("/getFriendsList");
    return {
        type: "RETURNED_FRIENDS_LIST",
        friends: response.data.list,
    };
}

export async function endFriend(id) {
    const response = await axios.post("/users/friendrequest/end", { id: id });
    return {
        type: "UNFRIEND",
        friends: response.data.id,
    };
}
export async function acceptFriend(id) {
    const response = await axios.post("/users/friendrequest/accept", {
        id: id,
    });
    return {
        type: "ACCEPT_FRIEND",
        newFriend: response.data.id,
    };
}

export const chatMessages = (prevMsgs) => {
    return {
        type: "PREV_MESSAGES",
        payload: prevMsgs,
    };
};
export const chatMessage = (msg) => {
    return {
        type: "SEND_MESSAGE",
        payload: msg,
    };
};
export const showNewMessage = (newMsg) => {
    return {
        type: "NEW_MESSAGE",
        payload: newMsg,
    };
};
