import React from "react";

import { useRouter } from "../../../../context/router";
import { useAuth } from "../../../../context/auth";
import { useAPI } from "../../../../api";

import sidebarStyles from "./styles/sidebar.module.css";

import Contacts from "../contacts";
import Button from "../../../button";
import Actions from "../actions";

import { handleLogout } from "../../utils";

import { useWindowDimension } from "../../../../hooks";

export default function Sidebar(props) {
  const { navigate } = useRouter();
  const { logout } = useAuth();
  const { post: logoutPostRequest } = useAPI();

  const {deviceType} = useWindowDimension()

  return (
    <div
      className={`${sidebarStyles.wrapper} ${
        !props?.isSidebarOpen ? sidebarStyles.closed : ""
      } ${sidebarStyles?.[deviceType]}`}
    >
      <div className={sidebarStyles.container}>
        <div className={sidebarStyles.top_section}>
          <Button
            replacementClassName={sidebarStyles?.settings_button}
            onClick={props?.openSettings}
            iconType={"Settings"}
            iconClassName={sidebarStyles?.settings_button_svg}
          />
          <Button
            replacementClassName={sidebarStyles?.toggle_button}
            onClick={() => deviceType === "mobile" ? props?.setIsSidebarActive(!props?.isSidebarActive) : props?.setIsSidebarOpen(!props?.isSidebarOpen)}
            iconType={deviceType === "mobile" ? "Xmark" : (props?.isSidebarOpen ? "ChevronLeft" : "ChevronRight")}
            iconClassName={`${sidebarStyles?.toggle_button_svg} ${deviceType === "mobile" ? sidebarStyles?.close_button_svg : ""}`}
          />
        </div>
        {props?.isSidebarOpen && (
          <div className={sidebarStyles.content_section}>
            <Actions
              setNotification={props?.setNotification}
              initialContactList={props?.initialContactList}
              data={props?.data}
              addContactQuery={props?.addContactQuery}
              setAddContactQuery={props?.setAddContactQuery}
              searchContactQuery={props?.searchContactQuery}
              setSearchContactQuery={props?.setSearchContactQuery}
              setStatusFilter={props?.setStatusFilter}
              statusFilter={props?.statusFilter}
            />
            <Contacts
              setIsSidebarActive={props?.setIsSidebarActive}
              getMessageListRequest={props?.getMessageListRequest}
              contactListLoading={props?.contactListLoading}
              contacts={props?.contacts}
              lastMessageRef={props?.lastMessageRef}
              setSelectedContact={props?.setSelectedContact}
              selectedContact={props?.selectedContact}
            />
          </div>
        )}
        <div className={sidebarStyles.bottom_section}>
          <Button
            replacementClassName={sidebarStyles.logout_button}
            onClick={() => handleLogout({
              logoutPostRequest,
              logout,
              navigate,
              setNotification: props?.setNotification,
            })}
            iconType={"LogOut"}
            iconClassName={sidebarStyles?.logout_button_svg}
            title={props?.isSidebarOpen ? "Logout" : null}
          />
        </div>
      </div>
    </div>
  );
}
