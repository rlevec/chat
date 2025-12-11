import { routes } from "../../../../../routes";

export const statusMap = ({ status, blocker, sender }) => {
    if (status === "pending") {
      if (sender) return "Contact request is pending feedback!";
      else return "Contact request is awaiting feedback!";
    } else if (status === "blocked") {
      if (blocker) return "You have blocked this contact!";
      else return "You have been blocked by this contact!";
    } else if (status === "accepted") {
      return "Connected Successfully";
    } else return "Unknow Status";
  };


  export const handleContactAction = async({contactAction, selectedContactId, target, setNotification}) => {
    const response = await contactAction({
      url: routes?.server?.[target],
      body: { id: selectedContactId },
    });

    if(!response?.success && response?.message) {
      setNotification({message: response?.message, type: "error"})
    }
  }
