import { useEffect } from "react";

export const useChatComponentEffects = (params = {}) => {
  const {
    contactsRef = null,
    selectedContactRef = null,
    setContacts = () => [],
    setMessages = [],
    contactListData = [],
    messageListData = [],
    searchContactQuery = "",
    setDebouncedSearchContactQuery = () => "",
    debouncedSearchContactQuery = "",
    contacts = [],
    setFilteredContacts = () => [],
    statusFilter = null
  } = params;


  useEffect(() => {
    contactsRef.current = null;
    selectedContactRef.current = null
    if(contactListData?.length === 0) return;
    setContacts(contactListData)
  }, [contactListData]);
   

  useEffect(() => {
    if(messageListData?.length === 0) return;
    setMessages(messageListData)
  }, [messageListData])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchContactQuery(searchContactQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchContactQuery]);

  useEffect(() => {
    const newContacts = contacts?.filter((contact) => {
      const username = contact?.username?.toLowerCase() || "";
      const searchTerm = debouncedSearchContactQuery?.toLowerCase() || "";

      const matchesSearch = username.includes(searchTerm);

      const matchesStatus =
        !statusFilter ||
        (["online", "offline"].includes(statusFilter)
          ? contact?.online === (statusFilter === "online")
          : contact?.status === statusFilter);

      return matchesSearch && matchesStatus;
    }) || []

    setFilteredContacts(newContacts)
  }, [contacts, debouncedSearchContactQuery, statusFilter])
};
