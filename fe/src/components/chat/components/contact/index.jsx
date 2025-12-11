import React from "react";

import contactStyles from "./styles/contact.module.css";

import Image from "../../../image";

import { routes } from "../../../../routes";

export default function Contact(props) {
  return (
    <div
      className={contactStyles.contact_item_container}
      onClick={props?.selectContact}
    >
      <div
        className={`${contactStyles.contact_link} ${
          props?.isActive ? contactStyles.active : ""
        }`}
      >
        <div className={contactStyles.contact_avatar}>
          <Image
            disableCache={true}
            src={`${routes?.server?.profile_picture}/${props?.contact?.contact_id}`}
            replacementImageClassName={contactStyles.avatar_image}
            replacementContainerClassName={contactStyles?.avatar_container}
            isFallbackIcon={true}
            fallbackIconReplacementClassName={
              contactStyles.fallback_avatar_image
            }
            fallbackIcon={"User"}
          />
          <div
            className={`${contactStyles.status_indicator} ${
              props?.contact?.online
                ? contactStyles.online
                : contactStyles.offline
            }`}
          />
        </div>
        <div className={contactStyles.contact_info}>
          <div className={contactStyles.contact_name}>
            {props?.contact?.name || props?.contact?.username}
          </div>
          <div className={`${contactStyles.last_seen} ${props?.contact?.online ? contactStyles?.online : ""}`}>
            {props?.contact?.online ? "Online" : props?.contact?.last_seen}
          </div>
        </div>
        {props?.contact?.unreadCount > 0 && (
          <div className={contactStyles.unread_badge}>
            {props?.contact.unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}
