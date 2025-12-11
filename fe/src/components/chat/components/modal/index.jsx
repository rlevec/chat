import React from "react";
import modalStyles from "./styles/modal.module.css";
import Image from "../../../image";
import Button from "../../../button";
import { useAPI } from "../../../../api";
import { useRouter } from "../../../../context/router";
import { routes } from "../../../../routes";
import { fieldMap, userDataMap } from "./utils";
import Loader from "../../../loader";
import Icon from "../../../icon";
import { useWindowDimension } from "../../../../hooks";

export default function Modal(props) {

  const { deviceType } = useWindowDimension();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: refetchUserData,
  } = useAPI({
    initialUrl: routes?.server?.user,
  });

  const { navigate } = useRouter();

  return (
    <div className={`${modalStyles.wrapper} ${modalStyles?.[deviceType]}`} onClick={props?.closeModal}>
      <div
        className={modalStyles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.content_box}>
          {userLoading && (
            <div className={modalStyles?.indicator_container}>
              <Loader
                additionalClassName={modalStyles?.indicator_loader}
                type={"circular"}
              />
              <div className={modalStyles?.indicator_title}>
                Loading user data...
              </div>
            </div>
          )}
          {userError && (
            <div className={modalStyles?.indicator_container}>
              <Icon
                className={modalStyles?.indicator_error_icon}
                type={"ExclamationCircle"}
              />
              <div className={modalStyles?.indicator_title}>
                Error loading user data
              </div>
              <Button
                replacementClassName={modalStyles?.indicator_button}
                onClick={() => refetchUserData()}
                iconType={"ArrowsRotate"}
                iconClassName={modalStyles?.indicator_icon_svg}
              />
            </div>
          )}
          {!userLoading && !userError && userData?.data && userData?.success ? (
            <>
              <div className={modalStyles.profile_picture_wrapper}>
                <Image
                  disableCache
                  src={`${routes.server.profile_picture}/${userData.data.id}`}
                  alt="profile_picture"
                  width={150}
                  height={150}
                />
                <Button
                  replacementClassName={modalStyles.edit_profile_button}
                  onClick={() =>
                    navigate({ path: routes.client.upload_profile_picture })
                  }
                  iconClassName={modalStyles.close_button_svg}
                  iconType="Pen"
                />
              </div>
              <div className={modalStyles?.username_contacts_container}>
                {userDataMap?.map((userDataEntry, idx) => {
                  return (
                    <div
                      key={idx}
                      className={modalStyles?.username_contacts_content}
                    >
                      {`${userDataEntry?.label}: `}
                      <span>{userData?.data?.[userDataEntry?.valueKey]}</span>
                    </div>
                  );
                })}
              </div>
              <div className={modalStyles.fields_wrapper}>
                {fieldMap?.map((field, idx) => (
                  <Button
                    key={idx}
                    replacementClassName={modalStyles.field_button}
                    onClick={() => navigate({ path: field?.redirect })}
                    iconClassName={modalStyles.field_button_icon}
                    iconType="Pen"
                    title={field?.title}
                    titleClassName={modalStyles.field_button_title}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={modalStyles?.indicator_container}>
              <Icon
                className={modalStyles?.indicator_error_icon}
                type={"ExclamationCircle"}
              />
              <div className={modalStyles?.indicator_title}>
                Invalid user data
              </div>
              <Button
                replacementClassName={modalStyles?.indicator_button}
                onClick={() => refetchUserData()}
                iconType={"ArrowsRotate"}
                iconClassName={modalStyles?.indicator_icon_svg}
              />
            </div>
          )}
        </div>
      </div>
      <div className={modalStyles.close_btn_container}>
        <Button
          replacementClassName={modalStyles.close_button}
          onClick={props.closeModal}
          iconClassName={modalStyles.close_button_svg}
          iconType="Times"
        />
      </div>
    </div>
  );
}
