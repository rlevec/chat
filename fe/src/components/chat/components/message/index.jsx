import React from "react";

import Icon from "../../../icon";

import messageStyles from "./styles/message.module.css";

import { useAPI } from "../../../../api";

import { handleDeleteMessage } from "./utils";

export default function Message(props) {
  
  const {
    post: submitDeleteMessageData
  } = useAPI();

  return (
    <div
      ref={props?.idx === props?.messagesLength - 1 ? props?.lastMessageRef : null}
      className={`${messageStyles.message_bubble} ${props?.editMessageActive === props?.message?.id ? messageStyles?.editing : ""} ${
        props?.message.type === "sent" ? messageStyles.message_sent : messageStyles.message_received
      }`}
    >
      <div className={messageStyles?.sender_read_container}>
        <div className={messageStyles?.sender_indicator}>{props?.message.type === "sent" ? "You" : props?.selectedContact?.username}</div>
      </div>
      <div className={messageStyles.message_content}>
        {props?.message.content}
      </div>
      <div className={messageStyles?.message_cta_metadata_container}>
      <div className={messageStyles.message_metadata}>
          <span className={messageStyles.message_time}>
            {props?.message.time}
          </span>
        </div>
        {props?.message.type === "sent" ? (
          <div className={messageStyles?.cta_container}>
            {props?.message.type === "sent" && props?.editMessageActive === props?.message?.id && (
            <Icon
              type={"Xsquare"}
              className={messageStyles?.cta_icon}
              onClick={() => {
                props?.setEditMessageQuery("")
                props?.setEditMessageActive?.(null)
              }}
            />
          )}
          {props?.message.type === "sent" && props?.editMessageActive !== props?.message?.id && (
            <Icon
              type={"PenSquare"}
              className={messageStyles?.cta_icon}
              onClick={() => {
                props?.setEditMessageQuery(props?.message.content)
                props?.setEditMessageActive?.(props.message?.id)
              } }
            />
          )}
          {props?.message.type === "sent" && (
            <Icon
            onClick={() => handleDeleteMessage({
              request: submitDeleteMessageData,
              contact: props?.selectedContact?.contact_id,
              setEditMessageActive: props?.setEditMessageActive,
              setEditMessageQuery: props?.setEditMessageQuery,
              messageId: props?.message?.id,
              editMessageActive: props?.editMessageActive,
            })}
              type={"Trash"}
              className={messageStyles?.cta_icon}
            />
          )}
        </div>
        ) :  props?.message?.is_edited ? <div className={messageStyles?.edited}>Edited</div> : null}
      </div>
    </div>
  );
}
