import React from "react";

import { useAPI } from "../../../../api";

import contactHeaderStyles from "./styles/contact_header.module.css";

import { routes } from "../../../../routes";

import Button from "../../../button";

import Image from "../../../image";

import { statusMap, handleContactAction } from "./utils";

import {useWindowDimension} from "../../../../hooks"

export default function ContactHeader(props) {
  const {deviceType} = useWindowDimension()

  const { post: submitDeclineContactRequest } = useAPI();

  const { post: submitAcceptContactRequest } = useAPI();

  const { post: submitBlockContactRequest } = useAPI();

  const { post: submitUnblockContactRequest } = useAPI();

  const { post: submitRemoveContactRequest } = useAPI();

  return (
    <div className={`${contactHeaderStyles.chat_header} ${contactHeaderStyles?.[deviceType]}`}>
      <div className={contactHeaderStyles?.contact_avatar_info_container}>
        <div className={contactHeaderStyles.contact_avatar}>
          <Image
            disableCache={true}
            src={`${routes?.server?.profile_picture}/${props?.selectedContact?.contact_id}`}
            replacementImageClassName={contactHeaderStyles.contact_avatar_image}
            replacementContainerClassName={
              contactHeaderStyles?.contact_avatar_container
            }
            isFallbackIcon={true}
            fallbackIconReplacementClassName={contactHeaderStyles.avatar_placeholder}
            fallbackIcon={"User"}
          />
          <div
            className={`${contactHeaderStyles.status_indicator} ${
              contactHeaderStyles[
                `status_indicator_${
                  props?.selectedContact?.online ? "online" : "offline"
                }`
              ]
            }`}
          />
        </div>
        <div className={contactHeaderStyles.contact_info}>
          <div className={contactHeaderStyles.contact_name}>
            {props?.selectedContact?.username}
          </div>
          <div className={`${contactHeaderStyles.contact_status} ${
              contactHeaderStyles[
                `status_${
                  props?.selectedContact?.online ? "online" : "offline"
                }`
              ]
            }`}>
            {props?.selectedContact?.online ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className={contactHeaderStyles?.status_section}>
        {props?.selectedContact?.status && (
          <div
            className={`${contactHeaderStyles.contact_request_status} ${
              contactHeaderStyles[
                `contact_request_status_${props?.selectedContact?.status}`
              ]
            }`}
          >
            {statusMap({
              status: props?.selectedContact?.status,
              sender: props?.selectedContact?.sender,
              blocker: props?.selectedContact?.blocker,
            })}
          </div>
        )}
      </div>
      <div className={contactHeaderStyles.contact_cta_section}>
        <div className={contactHeaderStyles.contact_cta_buttons_container}>
          {props?.selectedContact?.status === "pending" &&
            !Boolean(props?.selectedContact?.sender) && (
              <>
                <Button
                  replacementClassName={contactHeaderStyles.contact_accept_btn}
                  onClick={() =>
                    handleContactAction({
                      contactAction: submitAcceptContactRequest,
                      selectedContactId: props?.selectedContact?.contact_id,
                      target: "accept_contact_request",
                      setNotification: props?.setNotification,
                    })
                  }
                  iconType="Check"
                  iconClassName={contactHeaderStyles.contact_cta_icon}
                />
                <Button
                  replacementClassName={contactHeaderStyles.contact_decline_btn}
                  onClick={() =>
                    handleContactAction({
                      contactAction: submitDeclineContactRequest,
                      selectedContactId: props?.selectedContact?.contact_id,
                      target: "decline_contact_request",
                      setNotification: props?.setNotification,
                    })
                  }
                  iconType="Times"
                  iconClassName={contactHeaderStyles.contact_cta_icon}
                />
              </>
            )}
          {props?.selectedContact?.status === "accepted" && (
            <>
              <Button
                replacementClassName={contactHeaderStyles.contact_cta_btn}
                onClick={() =>
                  handleContactAction({
                    contactAction: submitRemoveContactRequest,
                    selectedContactId: props?.selectedContact?.contact_id,
                    target: "remove_contact",
                    setNotification: props?.setNotification,
                  })
                }
                iconType="UserMinus"
                iconClassName={contactHeaderStyles.contact_cta_icon}
              />
              <Button
                replacementClassName={contactHeaderStyles.contact_cta_btn}
                onClick={() =>
                  handleContactAction({
                    contactAction: submitBlockContactRequest,
                    selectedContactId: props?.selectedContact?.contact_id,
                    target: "block_contact",
                    setNotification: props?.setNotification,
                  })
                }
                iconType="Ban"
                iconClassName={contactHeaderStyles.contact_cta_icon}
              />
            </>
          )}
          {props?.selectedContact?.status === "blocked" &&
            Boolean(props?.selectedContact?.blocker) && (
              <Button
                replacementClassName={contactHeaderStyles.contact_cta_btn}
                onClick={() =>
                  handleContactAction({
                    contactAction: submitUnblockContactRequest,
                    selectedContactId: props?.selectedContact?.contact_id,
                    target: "unblock_contact",
                    setNotification: props?.setNotification,
                  })
                }
                iconType="UserPlus"
                iconClassName={contactHeaderStyles.contact_cta_icon}
              />
            )}
        </div>
      </div>
    </div>
  );
}
