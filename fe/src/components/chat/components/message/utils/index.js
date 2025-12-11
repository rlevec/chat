import { routes } from "../../../../../routes";

export const handleDeleteMessage = async ({
  contact,
  setEditMessageActive,
  setEditMessageQuery,
  messageId,
  editMessageActive,
  request
}) => {
  const response = await request({
    url: routes?.server?.delete_message,
    body: { contact, message_id: messageId },
  });


  if (!response?.success && response?.message) {
    setNotification({ message: response?.message, type: "error" });
    return;
  }

  if (editMessageActive === messageId) {
    setEditMessageActive(null);
    setEditMessageQuery("");
  }
};
