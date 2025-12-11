import { connect } from "./connect/index.js";
import { disconnect } from "./disconnect/index.js";
import { auth } from "./auth/index.js";
import { emit } from "./emit/index.js";
import { events } from "./events/index.js";

export const socket_io = {
    connect,
    disconnect,
    auth,
    emit,
    events,
} 