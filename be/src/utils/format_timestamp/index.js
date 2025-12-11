export const formatTimestamp = ({timestamp, options = {}, locale = "en-US"}) => {
    if (!timestamp) return null;
  
    const tsNumber = typeof timestamp === "string" ? Number(timestamp) : timestamp;
    if (isNaN(tsNumber)) return null;
  
    const defaultOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
  
    return new Date(tsNumber).toLocaleString(locale, { ...defaultOptions, ...options });
  }