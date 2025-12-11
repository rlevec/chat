import React from "react";

import chatStyles from "./styles/chat.module.css";

import Sidebar from "./components/sidebar";
import Messages from "./components/messages";
import Input from "./components/input";
import Modal from "./components/modal";
import ContactHeader from "./components/contact_header";
import Notification from "../notification";
import Header from "./components/header";

import { useSocketIO } from "./socket_io";

import { useChatComponentState } from "./state";
import { useChatComponentEffects } from "./effects";
import { useChatComponentRefs } from "./refs";

import useAPI from "../../api";

import { routes } from "../../routes";

import Loader from "../loader";

import Button from "../button";

import { useWindowDimension } from "../../hooks";

export default function Chat(props) {
  const { deviceType } = useWindowDimension();

  const chatComponentState = useChatComponentState();

  const {
    data: contactListGetRequestData,
    loading: contactListGetRequestLoading,
    error: contactListGetRequestError,
  } = useAPI({ initialUrl: routes?.server?.contact_list });

  const {
    get: getMessageListRequest,
    data: messageListGetRequestData,
    loading: messageListGetRequestLoading,
    error: messageListGetRequestError,
  } = useAPI();

  const { contactsRef, selectedContactRef, lastMessageRef } =
    useChatComponentRefs({
      contacts: chatComponentState?.contacts,
      selectedContact: chatComponentState?.selectedContact,
    });

  const { socket, webSocketStatus } = useSocketIO({
    setContacts: chatComponentState?.setContacts,
    setSelectedContact: chatComponentState?.setSelectedContact,
    contactsRef,
    selectedContactRef,
    setMessages: chatComponentState?.setMessages,
    setNotification: chatComponentState?.setNotification,
  });

  useChatComponentEffects({
    contactsRef,
    selectedContactRef,
    setContacts: chatComponentState?.setContacts,
    setMessages: chatComponentState?.setMessages,
    contactListData: contactListGetRequestData?.data,
    messageListData: messageListGetRequestData?.data,
    searchContactQuery: chatComponentState?.searchContactQuery,
    setDebouncedSearchContactQuery:
      chatComponentState?.setDebouncedSearchContactQuery,
    debouncedSearchContactQuery:
      chatComponentState?.debouncedSearchContactQuery,
    setFilteredContacts: chatComponentState?.setFilteredContacts,
    contacts: chatComponentState?.contacts,
    statusFilter: chatComponentState?.statusFilter,
  });

  const renderSidbear = ({ deviceType, isSidebarActive }) => {
    if (deviceType === "mobile") return isSidebarActive;
    else return true;
  };

  return (
    <div className={`${chatStyles?.wrapper} ${chatStyles?.[deviceType]}`}>
      <div className={chatStyles?.container}>
        {contactListGetRequestError || messageListGetRequestError ? (
          <div className={chatStyles?.error_container}>
            <div className={chatStyles?.error_message}>
              Something went wrong while loading your chats. Please try again.
            </div>
            <Button
              onClick={() => window.location.reload()}
              title={"Refresh"}
              renderType={"primary"}
            />
          </div>
        ) : (
          <>
            {webSocketStatus === "disconnected" ? (
              <div className={chatStyles?.ws_status_container}>
                <Loader
                  additionalClassName={chatStyles?.ws_status_loader}
                  type={"circular"}
                />
                <div className={chatStyles?.ws_status}>Reconnecting</div>
              </div>
            ) : (
              <>
                {chatComponentState?.notification?.message &&
                  chatComponentState?.notification?.type && (
                    <Notification
                      message={chatComponentState?.notification?.message}
                      type={chatComponentState?.notification?.type}
                      duration={3000}
                      onClose={() => chatComponentState?.setNotification(null)}
                    />
                  )}
                {chatComponentState?.modalActive && (
                  <Modal
                    closeModal={() => chatComponentState?.setModalActive(false)}
                  />
                )}
                {deviceType === "mobile" && (
                  <Header
                    activateSidebar={() => {
                      chatComponentState?.setIsSidebarOpen(true)
                      chatComponentState?.setIsSidebarActive(true)
                    }}
                    setNotification={chatComponentState?.setNotification}
                  />
                )}
                {renderSidbear({
                  deviceType,
                  isSidebarActive: chatComponentState?.isSidebarActive,
                }) && (
                  <Sidebar
                    setIsSidebarActive={chatComponentState?.setIsSidebarActive}
                    isSidebarActive={chatComponentState?.isSidebarActive}
                    getMessageListRequest={getMessageListRequest}
                    setNotification={chatComponentState?.setNotification}
                    initialContactList={chatComponentState?.contacts}
                    data={props?.data}
                    socket={socket}
                    openSettings={() =>
                      chatComponentState?.setModalActive(true)
                    }
                    addContactQuery={chatComponentState?.addContactQuery}
                    setAddContactQuery={chatComponentState?.setAddContactQuery}
                    searchContactQuery={chatComponentState?.searchContactQuery}
                    setSearchContactQuery={
                      chatComponentState?.setSearchContactQuery
                    }
                    contacts={chatComponentState?.filteredContacts}
                    isSidebarOpen={chatComponentState?.isSidebarOpen}
                    setIsSidebarOpen={chatComponentState?.setIsSidebarOpen}
                    selectedContact={chatComponentState?.selectedContact}
                    setSelectedContact={chatComponentState?.setSelectedContact}
                    setStatusFilter={chatComponentState?.setStatusFilter}
                    statusFilter={chatComponentState?.statusFilter}
                    lastMessageRef={lastMessageRef}
                    contactListLoading={contactListGetRequestLoading}
                  />
                )}
                <div className={chatStyles?.content_container}>
                  {chatComponentState?.selectedContact ? (
                    <>
                      <ContactHeader
                        setNotification={chatComponentState?.setNotification}
                        selectedContact={chatComponentState?.selectedContact}
                      />
                      {messageListGetRequestLoading ? (
                        <div className={chatStyles?.message_loader_container}>
                          <Loader
                            additionalClassName={chatStyles?.message_loader}
                            type={"circular"}
                          />
                          <div className={chatStyles?.meassage}>
                            Loading messages...
                          </div>
                        </div>
                      ) : (
                        <>
                          <Messages
                            setEditMessageQuery={
                              chatComponentState?.setEditMessageQuery
                            }
                            editMessageActive={
                              chatComponentState?.editMessageActive
                            }
                            setEditMessageActive={
                              chatComponentState?.setEditMessageActive
                            }
                            messages={chatComponentState?.messages}
                            selectedContact={
                              chatComponentState?.selectedContact
                            }
                            lastMessageRef={lastMessageRef}
                          />
                          {chatComponentState?.selectedContact?.status ===
                            "accepted" && (
                            <Input
                              setNotification={
                                chatComponentState?.setNotification
                              }
                              selectedContact={
                                chatComponentState?.selectedContact
                              }
                              data={props?.data}
                              setEditMessageActive={
                                chatComponentState?.setEditMessageActive
                              }
                              editMessageActive={
                                chatComponentState?.editMessageActive
                              }
                              editMessageQuery={
                                chatComponentState?.editMessageQuery
                              }
                              setEditMessageQuery={
                                chatComponentState?.setEditMessageQuery
                              }
                              sendMessageQuery={
                                chatComponentState?.sendMessageQuery
                              }
                              setSendMessageQuery={
                                chatComponentState?.setSendMessageQuery
                              }
                              lastMessageRef={lastMessageRef}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <div className={chatStyles?.contact_message}>
                      Select contact from contact list in order to initiate
                      message actions...
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
