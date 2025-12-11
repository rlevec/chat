import React from "react";

import TextInput from "../../../inputs/text_input";

import Button from "../../../button";

import inputStyles from "./styles/input.module.css";

import { useAPI } from "../../../../api";

import { useWindowDimension } from "../../../../hooks";

import { handleEditMessage, handleSendMessage } from "./utils";

export default function Input(props) {
  const {deviceType} = useWindowDimension()
  
  const { post: submitSendMessageData } = useAPI();

  const { post: submitEditMessageData } = useAPI();

  return (
    <div className={`${inputStyles.input_container} ${inputStyles?.[deviceType]}`}>
      <div className={inputStyles.input_wrapper}>
        <TextInput
          onKeyDown={({ event }) => {
            if (event?.key === "Enter") {
              if (props?.editMessageActive) {
                handleEditMessage({
                  request: submitEditMessageData,
                  selectedContactId: props?.selectedContact?.contact_id,
                  editMessageActive: props?.editMessageActive,
                  editMessageQuery: props?.editMessageQuery,
                  setEditMessageActive: props?.setEditMessageActive,
                  setEditMessageQuery: props?.setEditMessageQuery,
                  setNotification: props?.setNotification,
                })
              } else {
                handleSendMessage({
                  sendMessageQuery: props?.sendMessageQuery,
                  setSendMessageQuery: props?.setSendMessageQuery,
                  lastMessageRef: props?.lastMessageRef,
                  request: submitSendMessageData,
                  selectedContactId: props?.selectedContact?.contact_id,
                  setNotification: props?.setNotification,
                })
              }
            } else if (event?.key === "Escape") {
              if (props?.editMessageActive) {
                props?.setEditMessageActive(null);
                props?.setEditMessageQuery("");
              } else {
                props?.setSendMessageQuery("");
              }
            } else return null;
          }}
          additionalFieldIconClassName={inputStyles?.send_message_icon}
          replacementInputClassName={inputStyles.text_input}
          {...props?.data?.fields?.[
            `${props?.editMessageActive ? "edit" : "send"}_message`
          ]}
          value={
            props?.editMessageActive
              ? props?.editMessageQuery
              : props?.sendMessageQuery
          }
          onChange={({ event }) =>
            props?.editMessageActive
              ? props?.setEditMessageQuery(event?.target?.value)
              : props?.setSendMessageQuery(event?.target?.value)
          }
        />
      </div>
      {props?.editMessageActive && (
        <Button
          onClick={() => {
            props?.setEditMessageActive(null);
            props?.setEditMessageQuery("");
          }}
          iconType={"Xmark"}
          replacementClassName={inputStyles.cta_button}
          iconClassName={`${inputStyles?.cta_button_icon} ${inputStyles?.close_button_icon}`}
        />
      )}
      <Button
        onClick={() =>
          props?.editMessageActive
            ? handleEditMessage({
                request: submitEditMessageData,
                selectedContactId: props?.selectedContact?.contact_id,
                editMessageActive: props?.editMessageActive,
                editMessageQuery: props?.editMessageQuery,
                setEditMessageActive: props?.setEditMessageActive,
                setEditMessageQuery: props?.setEditMessageQuery,
                setNotification: props?.setNotification,
              })
            : handleSendMessage({
                sendMessageQuery: props?.sendMessageQuery,
                setSendMessageQuery: props?.setSendMessageQuery,
                lastMessageRef: props?.lastMessageRef,
                request: submitSendMessageData,
                selectedContactId: props?.selectedContact?.contact_id,
                setNotification: props?.setNotification,
              })
        }
        iconType={props?.editMessageActive ? "Check" : "PaperPlane"}
        replacementClassName={inputStyles.cta_button}
        disabled={
          props?.editMessageActive
            ? !props?.editMessageQuery?.trim()
            : !props?.sendMessageQuery?.trim()
        }
        iconClassName={inputStyles?.cta_button_icon}
      />
    </div>
  );
}
