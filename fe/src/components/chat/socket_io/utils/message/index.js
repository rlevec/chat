export const send_message = ({ data, selectedContactRef, setMessages }) => {
    console.log("WS_send_message", data);

  
    const message = data?.message;
    const senderId = data?.senderId
    const receiverId = data?.receiverId
    const selectedContactId = selectedContactRef.current?.contact_id

    if (!message || !selectedContactId) return;
    
    const messageBelongsToCurrentChat =
      parseInt(selectedContactId) === parseInt(senderId) ||
      parseInt(selectedContactId) === parseInt(receiverId);
    
    if (messageBelongsToCurrentChat) {
      setMessages((prev) => [...prev, message]);
    }
  };
  
  
  export const delete_message = ({
    data, selectedContactRef, setMessages
  }) => {
    console.log("WS_delete_message", data);
  
    const selectedContactId = selectedContactRef.current?.contact_id
    const messageId = data?.messageId;

    if (messageId && selectedContactId) {
      setMessages((prev) => prev?.filter((prev) => prev?.id !== messageId))
    }
  };

  export const edit_message = ({
    data, selectedContactRef, setMessages
  }) => {
    console.log("WS_edit_message", data);
  
    const messageId = data?.messageId;
    const messageContent = data?.content;
    const isEdited = data?.isEdited;
    const selectedContactId = selectedContactRef.current?.contact_id

    if (messageId && selectedContactId && messageContent) {
      setMessages((prev) => {
        const idx = prev?.findIndex((m) => parseInt(m?.id) === parseInt(messageId));
  
        if (idx === -1) {
          return prev;
        }
  
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          is_edited: isEdited ?? false,
          content: messageContent,
        };
  
        return updated;
      });
    }
  };
  

  export const message_utils = {
    send_message,
    delete_message,
    edit_message
  };