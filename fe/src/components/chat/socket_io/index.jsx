import { useState, useRef, useEffect } from "react";

import { useAuth } from "../../../context/auth";

import { useAPI } from "../../../api";

import { io } from "socket.io-client";

import { routes } from "../../../routes";

import { utils } from "./utils";

export const useSocketIO = (params = {}) => {
  const {
    setContacts = () => [],
    setSelectedContact = () => null,
    contactsRef = null,
    selectedContactRef = null,
    setMessages = [],
    setNotification = () => null
  } = params;

  const { post: refreshTokenRequest } = useAPI();

  const { token, login } = useAuth();

  const socket = useRef(null);

  const [webSocketStatus, setWebSocketStatus] = useState("connecting");

  useEffect(() => {
    if (!token) return;

    //old socket cleanup
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }

    socket.current = io(routes?.server?.root, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
    });

    //remove all previous listeners
    socket.current.off();

    socket.current.on("connect", () => {
      utils?.connect({ setWebSocketStatus });
    });

    socket.current.on("disconnect", async (reason) => {
      utils?.disconnect({
        setWebSocketStatus,
        reason,
        socket,
        login,
        refreshTokenRequest,
      });
    });

    socket.current.on("connect_error", (err) => {
      utils?.connect_error({ err });
    });

    socket.current.on("connection_ack", (data) => {
      utils?.connection_ack({
        data,
        selectedContactRef,
        setSelectedContact,
        setContacts,
        contactsRef,
        setNotification
      });
    });

    socket.current.on("contact_request_sent", (data) => {
      utils?.contact_request_sent({ data, setContacts, setNotification });
    });

    socket.current.on("contact_request_received", (data) => {
      utils?.contact_request_received({
        data,
        setContacts,
        setNotification
      });
    });

    socket.current.on("contact_request_declined", (data) => {
      utils?.contact_request_declined({
        data,
        setContacts,
        selectedContactRef,
        setSelectedContact,
        setNotification
      });
    });

    socket.current.on("remove_contact", (data) => {
      utils?.remove_contact({
        data,
        setContacts,
        selectedContactRef,
        setSelectedContact,
        setNotification
      });
    });

    socket.current.on("contact_request_accepted", (data) => {
      utils?.contact_request_accepted({
        data,
        setContacts,
        contactsRef,
        selectedContactRef,
        setSelectedContact,
        setNotification
      });
    });

    socket.current.on("block_contact", (data) => {
      utils?.block_contact({
        data,
        setContacts,
        contactsRef,
        selectedContactRef,
        setSelectedContact,
        setNotification
      });
    });

    socket.current.on("unblock_contact", (data) => {
      utils?.unblock_contact({
        data,
        setContacts,
        contactsRef,
        selectedContactRef,
        setSelectedContact,
        setNotification
      });
    });

    socket.current.on("send_message", (data) => {
      utils?.send_message({
        data,
        setMessages,
        selectedContactRef,
      });
    });

    socket.current.on("delete_message", (data) => {
      utils?.delete_message({
        data,
        setMessages,
        selectedContactRef,
      });
    });

    socket.current.on("edit_message", (data) => {
      utils?.edit_message({
        data,
        setMessages,
        selectedContactRef,
      });
    });

    socket.current.on("user_connected", (data) => {
      utils?.user_connected({
        data,
        selectedContactRef,
        setSelectedContact,
        setContacts,
        contactsRef,
        setNotification
      });
    });

    socket.current.on("change_username", (data) => {
      utils?.change_username({
        data,
        selectedContactRef,
        setSelectedContact,
        setContacts,
        contactsRef,
        setNotification
      });
    });

    socket.current.on("user_disconnected", (data) => {
      utils?.user_disconnected({
        data,
        selectedContactRef,
        setSelectedContact,
        setContacts,
        contactsRef,
        setNotification
      });
    });

    socket.current.on("error", (data) => {
      utils?.error({ data });
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [token]);

  return {
    socket,
    webSocketStatus,
  };
};
