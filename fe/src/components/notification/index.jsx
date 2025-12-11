import React, { useEffect, useState } from "react";

import Icon from "../icon";

import notification_styles from "./styles/notification.module.css";

import { useWindowDimension } from "../../hooks";

export default function Notification(props) {
  const {deviceType} = useWindowDimension()

  const [isVisible, setIsVisible] = useState(true);
  
  const { message, type = "success", duration = 5000 } = props;

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        props?.onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`${notification_styles.notification_wrapper} ${notification_styles?.[type]} ${notification_styles?.[deviceType]}`}
    >
      <div className={notification_styles.notification_container}>
        <div className={notification_styles.notification_content}>
          <Icon
            type={type === "success" ? "CheckCircle" : "XmarkCircle"}
            className={notification_styles.notification_icon}
          />
          <div className={notification_styles.notification_message}>
            {message}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className={notification_styles.notification_close_button}
            aria-label="Close notification"
          >
            <Icon
              type={"Xmark"}
              className={notification_styles.notification_close_icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
