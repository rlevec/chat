import { routes } from "../../../../../routes";

export const handleSendContactRequest = async ({
  addContactQuery,
  setAddContactQuery,
  request,
  setNotification,
}) => {
  if (addContactQuery.trim()) {
    const response = await request({
      url: routes?.server?.send_contact_request,
      body: { contact: addContactQuery.trim() },
    });


    if (!response?.success && response?.message) {
      setNotification({ message: response?.message, type: "error" });
      return;
    }

    setAddContactQuery("");
  }
};
