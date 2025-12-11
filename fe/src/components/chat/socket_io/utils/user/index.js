export const connection_ack = ({
  data,
  selectedContactRef,
  setSelectedContact,
  setContacts,
  contactsRef,
  setNotification
}) => {
  console.log("WS_connection_ack", data);

  const userId = parseInt(data?.userId);
  const message = data?.message

  message && setNotification({message, type: "success"})

  if (
    selectedContactRef.current?.user_id === userId ||
    selectedContactRef?.current?.contact_id === userId
  ) {
    const updatedSelected = { ...selectedContactRef.current, online: true };
    setSelectedContact(updatedSelected);
    selectedContactRef.current = updatedSelected;
  }

  setContacts((prev) => {
    const newContacts = prev.map((c) =>
      c.user_id === userId || c.contact_id === userId
        ? { ...c, online: true }
        : c
    );
    contactsRef.current = newContacts;
    return newContacts;
  });
};

export const user_connected = ({
  data,
  selectedContactRef,
  setSelectedContact,
  setContacts,
  contactsRef,
  setNotification
}) => {
  console.log("WS_user_connected", data);

  const userId = parseInt(data?.userId);
  const online = data?.online;
  const lastSeen = data?.lastSeen;
  const message = data?.message

  message && setNotification({message, type: "success"})

  if (selectedContactRef?.current?.contact_id === userId) {
    const updatedSelected = {
      ...selectedContactRef.current,
      online,
      last_seen: lastSeen,
    };
    setSelectedContact(updatedSelected);
    selectedContactRef.current = updatedSelected;
  }

  setContacts((prev) => {
    const newContacts = prev.map((c) =>
      c.contact_id === userId ? { ...c, online, last_seen: lastSeen } : c
    );
    contactsRef.current = newContacts;
    return newContacts;
  });
};

export const user_disconnected = ({
  data,
  selectedContactRef,
  setSelectedContact,
  setContacts,
  contactsRef,
  setNotification
}) => {
  console.log("WS_user_disconnected", data);

  const userId = parseInt(data?.userId);
  const online = data?.online;
  const lastSeen = data?.lastSeen;
  const message = data?.message

  message && setNotification({message, type: "success"})

  if (selectedContactRef?.current?.contact_id === userId) {
    const updatedSelected = {
      ...selectedContactRef.current,
      online,
      last_seen: lastSeen,
    };
    setSelectedContact(updatedSelected);
    selectedContactRef.current = updatedSelected;
  }

  setContacts((prev) => {
    const newContacts = prev.map((c) =>
      c.contact_id === userId ? { ...c, online, last_seen: lastSeen } : c
    );
    contactsRef.current = newContacts;
    return newContacts;
  });
};

export const change_username = ({
  data,
  selectedContactRef,
  setSelectedContact,
  setContacts,
  contactsRef,
  setNotification
}) => {
  console.log("WS_change_username", data);

  const userId = parseInt(data?.contact?.userId);
  const username = data?.contact?.username
  const message = data?.message

  message && setNotification({message, type: "success"})

  if (selectedContactRef?.current?.contact_id === userId) {
    const updatedSelected = {
      ...selectedContactRef.current,
      username
    };
    setSelectedContact(updatedSelected);
    selectedContactRef.current = updatedSelected;
  }

  setContacts((prev) => {
    const newContacts = prev.map((c) =>
      c.contact_id === userId ? { ...c, username } : c
    );
    contactsRef.current = newContacts;
    return newContacts;
  });
};

export const user_utils = {
  connection_ack,
  user_connected,
  user_disconnected,
  change_username
};
