import { createContext, useMemo } from "react";
import { io } from "socket.io-client";
import { server } from "../constants/server.js";
const SocketContext = createContext();

const SocketProvider = (prop) => {
  console.log(server);
  const socket = useMemo(() => {
    return io(server, { withCredentials: true });
  }, []);
  socket.on("error", (err) => {
    console.log("Socket Error", err);
  });

  return (
    <SocketContext.Provider value={socket}>
      {prop.children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
