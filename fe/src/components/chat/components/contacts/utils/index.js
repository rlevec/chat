import { routes } from "../../../../../routes";

export const selectContactAndGetMessages = async ({
  request,
  contact,
  setSelectedContact,
  selectedContact,
  lastMessageRef,
  setIsSidebarActive,
  deviceType
}) => {
  setSelectedContact((prev) =>
    prev?.contact_id === contact?.contact_id ? null : contact
  );
  if (selectedContact?.contact_id !== contact?.contact_id) {
    await request({
      url: `${routes?.server?.message_list}/${contact?.contact_id}`,
    });

    if(deviceType === "mobile") setIsSidebarActive(false)

    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 250);
  }
};
