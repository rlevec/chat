import React, { Fragment } from "react";
import messagesStyles from "./styles/messages.module.css";
import Message from "../message";
import { formatDate } from "./utils";

export default function Messages(props) {
  return (
    <div className={messagesStyles.messages_container}>
      <div className={messagesStyles.messages_area}>
        <div className={messagesStyles.messages_list}>
          {props?.messages?.map((message, index) => {
            if (!Boolean(message?.content)) return null;

            const currentMessageDate = formatDate({ dateStr: message.time });
            const previousMessageDate =
              index > 0
                ? formatDate({ dateStr: props.messages[index - 1].time })
                : null;

            return (
              <Fragment key={`message-${index}`}>
                {currentMessageDate !== previousMessageDate && (
                  <div className={messagesStyles?.day_separator_container}>
                    <div className={messagesStyles?.day_separator_line}/>
                    <div className={messagesStyles.day_separator}>
                      {currentMessageDate}
                    </div>
                    <div className={messagesStyles?.day_separator_line}/>
                  </div>
                )}
                <Message
                  messagesLength={props?.messages?.length}
                  idx={index}
                  lastMessageRef={props?.lastMessageRef}
                  setEditMessageQuery={props?.setEditMessageQuery}
                  setEditMessageActive={props?.setEditMessageActive}
                  editMessageActive={props?.editMessageActive}
                  selectedContact={props?.selectedContact}
                  message={message}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
