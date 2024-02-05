import Pusher from "pusher-js";
const PUSHER_KEY = import.meta.env.VITE_PUSHER_APP_KEY;
const PUSHER_CLUSTURE = import.meta.env.VITE_PUSHER_APP_CLUSTER;
const pusher = new Pusher(PUSHER_KEY, {
    cluster: PUSHER_CLUSTURE,
    encrypted: true,
});

export const subscribeToChannel = (channelName, eventName, callback) => {
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
};
