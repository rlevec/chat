export const contact_request_sent = ({ data, setContacts, setNotification }) => {
  console.log("WS_contact_request_sent", data);

  const contact = data?.contact;

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (contact) {
    setContacts((prev) => [...prev, contact]);
  }
};

export const contact_request_received = ({ data, setContacts, setNotification }) => {
  console.log("WS_contact_request_received", data);

  const contact = data?.contact;

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (contact) {
    setContacts((prev) => {
      if (prev.some((c) => c.id === contact.id)) return prev;
      return [...prev, contact];
    });
  }
};

export const contact_request_declined = ({
  data,
  setContacts,
  selectedContactRef,
  setSelectedContact,
  setNotification
}) => {
  console.log("WS_contact_request_declined", data);

  const id = data?.contact?.contact_id;

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (id) {
    setContacts((prev) => prev.filter((c) => c.contact_id !== id));

    if (selectedContactRef.current?.contact_id === id) {
      const updatedSelected = null;
      setSelectedContact(updatedSelected);
      selectedContactRef.current = updatedSelected;
    }
  }
};

export const contact_request_accepted = ({
  data,
  setContacts,
  contactsRef,
  selectedContactRef,
  setSelectedContact,
  setNotification
}) => {
  console.log("WS_contact_request_accepted", data);

  const id = data?.contact?.contact_id

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (id) {
    setContacts((prev) => {
      const newContacts = prev.map((c) => (c.contact_id === id ? data?.contact : c));
      contactsRef.current = newContacts;
      return newContacts;
    });

    if (selectedContactRef.current?.contact_id === id) {
      const updatedSelected = data?.contact;
      setSelectedContact(updatedSelected);
      selectedContactRef.current = updatedSelected;
    }
  }
};

export const remove_contact = ({
  data,
  setContacts,
  selectedContactRef,
  setSelectedContact,
  setNotification
}) => {
  console.log("WS_remove_contact", data);

  const id = data?.contact?.contact_id;

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (id) {
    setContacts((prev) => prev.filter((c) => c.contact_id !== id));

    if (selectedContactRef.current?.contact_id === id) {
      const updatedSelected = null;
      setSelectedContact(updatedSelected);
      selectedContactRef.current = updatedSelected;
    }
  }
};

export const block_contact = ({
  data,
  setContacts,
  contactsRef,
  selectedContactRef,
  setSelectedContact,
  setNotification
}) => {
  console.log("WS_block_contact", data);

  const id = data?.contact?.contact_id

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (id) {
    setContacts((prev) => {
      const newContacts = prev.map((c) => (c.contact_id === id ? data?.contact : c));
      contactsRef.current = newContacts;
      return newContacts;
    });

    if (selectedContactRef.current?.contact_id === id) {
      const updatedSelected = data?.contact;
      setSelectedContact(updatedSelected);
      selectedContactRef.current = updatedSelected;
    }
  }
};

export const unblock_contact = ({
  data,
  setContacts,
  contactsRef,
  selectedContactRef,
  setSelectedContact,
  setNotification
}) => {
  console.log("WS_unblock_contact", data);

  const id = data?.contact?.contact_id

  const message = data?.message

  message && setNotification({message, type: "success"})

  if (id) {
    setContacts((prev) => {
      const newContacts = prev.map((c) => (c.contact_id === id ? data?.contact : c));
      contactsRef.current = newContacts;
      return newContacts;
    });

    if (selectedContactRef.current?.contact_id === id) {
      const updatedSelected = data?.contact;
      setSelectedContact(updatedSelected);
      selectedContactRef.current = updatedSelected;
    }
  }
};


export const contact_utils = {
  contact_request_sent,
  contact_request_received,
  contact_request_declined,
  contact_request_accepted,
  remove_contact,
  block_contact,
  unblock_contact,
};
