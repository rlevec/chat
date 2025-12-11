import React from "react";

import contactsStyles from "./styles/contacts.module.css";

import Icon from "../../../icon";

import Contact from "../contact";

import {selectContactAndGetMessages } from "./utils";

import { useWindowDimension } from "../../../../hooks";

import Loader from "../../../loader";

export default function Contacts(props) {
 
  const {deviceType} = useWindowDimension()

  return (
    <div className={contactsStyles.content_section}>
      {props?.contactListLoading ? (
        <div className={contactsStyles?.contacts_loading_container}>
          <Loader additionalClassName={contactsStyles?.contacts_loading_loader} type={"circular"}/>
          <div className={contactsStyles?.contacts_loading_message}>Loading contact list...</div>
        </div>
      ) : (
        <>
          <div className={contactsStyles.section_header}>
            <Icon type={"Users"} className={contactsStyles.section_icon} />
            <span className={contactsStyles.section_title}>Contacts</span>
            <span className={contactsStyles.section_count}>
              {`(${props?.contacts?.length})`}
            </span>
          </div>
          <div className={contactsStyles.contacts_list}>
            {props?.contacts?.map((contact, idx) => {
              return (
                <Contact
                  key={`${contact?.id ?? idx}`}
                  isActive={
                    contact?.contact_id === props?.selectedContact?.contact_id
                  }
                  contact={contact}
                  selectContact={async() => await selectContactAndGetMessages({
                    request: props?.getMessageListRequest,
                    contact,
                    setSelectedContact: props?.setSelectedContact,
                    selectedContact: props?.selectedContact,
                    lastMessageRef: props.lastMessageRef,
                    setIsSidebarActive: props?.setIsSidebarActive,
                    deviceType
                  })}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
