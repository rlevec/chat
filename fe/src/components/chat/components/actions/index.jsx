import React from "react";

import TextInput from "../../../inputs/text_input";

import SelectInput from "../../../inputs/select_input";

import Button from "../../../button";

import actionsStyles from "./styles/actions.module.css";

import { useAPI } from "../../../../api";

import { handleSendContactRequest } from "./utils";

export default function Actions(props) {
  const {
    post: submitSendContactRequest
  } = useAPI();

  return (
    <>
      <div className={actionsStyles.search_section}>
        {props?.initialContactList?.length > 0 && (
          <div className={actionsStyles.search_form}>
            <div className={actionsStyles.search_container}>
              <TextInput
                {...props?.data?.fields?.search_contact}
                replacementInputClassName={actionsStyles?.search_input}
                error={false}
                errorMessage={null}
                value={props?.searchContactQuery}
                onChange={({ event }) =>
                  props?.setSearchContactQuery(event.target.value ?? "")
                }
              />
              <Button
                replacementClassName={actionsStyles?.cta_button}
                onClick={() => props?.setSearchContactQuery("")}
                disabled={!Boolean(props?.searchContactQuery)}
                iconType={"Xmark"}
                iconClassName={actionsStyles?.cta_button_svg}
              />
            </div>
          </div>
        )}
      </div>
      <div className={actionsStyles.search_section}>
        <div className={actionsStyles.search_form}>
          <div className={actionsStyles.search_container}>
            <TextInput
              {...props?.data?.fields?.add_contact}
              replacementInputClassName={actionsStyles?.search_input}
              error={false}
              errorMessage={null}
              value={props?.addContactQuery}
              onChange={({ event }) =>
                props?.setAddContactQuery(event.target.value ?? "")
              }
            />
            <Button
              replacementClassName={actionsStyles?.cta_button}
              onClick={() =>
                handleSendContactRequest({
                  addContactQuery: props?.addContactQuery,
                  setAddContactQuery: props?.setAddContactQuery,
                  request: submitSendContactRequest,
                  setNotification: props?.setNotification,
                })
              }
              disabled={!props?.addContactQuery.trim()}
              iconType={"Plus"}
              iconClassName={actionsStyles?.cta_button_svg}
            />
          </div>
        </div>
      </div>
      {props?.initialContactList?.length > 0 && (
        <div className={actionsStyles.search_section}>
          <div className={actionsStyles.search_form}>
            <SelectInput
              additionalOptionClassName={actionsStyles?.select_option}
              replacementOptionsClassName={actionsStyles?.select_options}
              replacementOptionActiveClassName={
                actionsStyles?.select_option_active
              }
              additionalContainerClassName={actionsStyles?.select_container}
              replacementToggleSvgClassName={actionsStyles?.select_toggle_icon}
              replacementSelectActiveClassName={actionsStyles?.select_active}
              replacementValueClassName={actionsStyles?.select_value}
              additionalSelectClassName={actionsStyles?.select}
              {...props?.data?.fields?.filter_contacts}
              value={props?.statusFilter ?? "all"}
              onSelect={({ value }) =>
                props?.setStatusFilter(value === "all" ? null : value)
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
