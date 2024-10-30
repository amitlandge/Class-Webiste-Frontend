import { useContext } from "react";
import { SocketContext } from "./socketContext.jsx";

const getSocket = () => useContext(SocketContext);

export { getSocket };
