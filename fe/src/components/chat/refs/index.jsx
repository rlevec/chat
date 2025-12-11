import { useRef } from "react";

export const useChatComponentRefs = (params) => {
    const {
        contacts = [],
        selectedContact = null,
    } = params || {}

    const contactsRef = useRef(contacts);
    const selectedContactRef = useRef(selectedContact);
    const lastMessageRef = useRef(null)

    selectedContactRef.current = selectedContact;
    contactsRef.current = contacts;

    return {
        contactsRef,
        selectedContactRef,
        lastMessageRef
    }
}