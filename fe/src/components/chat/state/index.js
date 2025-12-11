import { useEffect, useState } from "react";

export const useChatComponentState = () => {
    const [modalActive, setModalActive] = useState(false);
    const [addContactQuery, setAddContactQuery] = useState("");
    const [searchContactQuery, setSearchContactQuery] = useState("");
    const [debouncedSearchContactQuery, setDebouncedSearchContactQuery] = useState("")
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [messages, setMessages] = useState([])
    const [statusFilter, setStatusFilter] = useState(null)
    const [sendMessageQuery, setSendMessageQuery] = useState(null);
    const [editMessageQuery, setEditMessageQuery] = useState("")
    const [editMessageActive ,setEditMessageActive] = useState(null)
    const [notification, setNotification] = useState(null)
    const [isSidebarActive, setIsSidebarActive] = useState(false)

    return {
        modalActive, setModalActive,
        addContactQuery, setAddContactQuery,
        searchContactQuery, setSearchContactQuery,
        debouncedSearchContactQuery, setDebouncedSearchContactQuery,
        selectedContact, setSelectedContact,
        contacts, setContacts,
        filteredContacts, setFilteredContacts,
        isSidebarOpen, setIsSidebarOpen,
        sendMessageQuery, setSendMessageQuery,
        messages,setMessages,
        statusFilter,setStatusFilter,
        editMessageQuery, setEditMessageQuery,
        editMessageActive ,setEditMessageActive,
        notification, setNotification,
        isSidebarActive, setIsSidebarActive
    }
  
}