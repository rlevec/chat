import { routes } from "../../../../../routes";

export const handleSendMessage = async ({
  sendMessageQuery,
  setSendMessageQuery,
  lastMessageRef,
  request,
  selectedContactId,
  setNotification,
}) => {

   if(!Boolean(sendMessageQuery)) return;

  const response = await request({
    url: routes?.server?.send_message,
    body: { contact: selectedContactId, content: sendMessageQuery?.trim() },
  });

  if (!response?.success && response?.message) {
    setNotification({ message: response?.message, type: "error" });
    return;
  }

  setSendMessageQuery("");
  if (lastMessageRef) {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleEditMessage = async ({
  request,
  selectedContactId,
  editMessageActive,
  editMessageQuery,
  setEditMessageActive,
  setEditMessageQuery,
  setNotification,
}) => {

  if(!Boolean(editMessageQuery)) return;

  const response = await request({
    url: routes?.server?.edit_message,
    body: {
      contact: selectedContactId,
      message_id: editMessageActive,
      content: editMessageQuery?.trim(),
    },
  });

  if (!response?.success && response?.message) {
    setNotification({ message: response?.message, type: "error" });
    return;
  }

  setEditMessageActive(null);
  setEditMessageQuery("");
};
