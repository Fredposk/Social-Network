export let socket;

export const init = () => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            console.log(msgs);
        });

        socket.on("chatMessage", (msg) => {
            console.log(msg);
        });
    }
};
