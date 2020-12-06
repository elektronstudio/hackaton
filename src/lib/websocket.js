import { ReconnectingWebsocket } from "https://elektronstudio.github.io/live/src/deps/reconnecting-websocket.js";
import { chatUrl } from "../../config.js";

export const socket = new ReconnectingWebsocket(chatUrl);
