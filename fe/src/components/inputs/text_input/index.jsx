import React, { useState } from "react";

import textInputStyles from "./styles/text_input.module.css";

import { allPillsValidated, iconMap } from "./utils";

import Icon from "../../icon";

export default function TextInput(props) {
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  return (
    <div
      className={`${props?.replacementWrapperClassName ?? textInputStyles?.wrapper} ${props?.additionalWrapperClassName ?? ""}`}
    >
      <div
        className={`${props?.replacementContainerClassName ?? textInputStyles?.container} ${props?.additionalContainerClassName ?? ""}`}
      >
        {Boolean(props?.label) && (
          <label
            className={`${props?.replacementLabelClassName ?? textInputStyles?.label} ${props?.additionalLabelClassName ?? ""}`}
          >
            {props?.label}
          </label>
        )}

        {iconMap?.[props?.frontendSlug] && (
          <div
            className={`${props?.replacementFieldIconClassName ?? textInputStyles?.field_icon} ${props?.additionalFieldIconClassName ?? ""}`}
          >
            <Icon
              className={`${props?.replacementFieldIconSvgClassName ?? textInputStyles?.field_icon_svg} ${props?.additionalFieldIconSvgClassName ?? ""}`}
              type={iconMap?.[props?.frontendSlug]}
            />
          </div>
        )}

        <input
          className={`${
            props?.replacementInputClassName ?? textInputStyles?.input
          } ${props?.additionalInputClassName ?? ""} ${
            props?.error ? props?.replacementErrorClassName ?? textInputStyles?.error : ""
          } ${props?.isPassword ? props?.replacementPasswordClassName ?? textInputStyles?.password : ""}`}
          placeholder={props?.placeholder ?? ""}
          value={props?.value ?? ""}
          onChange={(event) => props?.onChange({ event })}
          {...(props.onKeyDown && {
            onKeyDown: (event) => props.onKeyDown({event})
          })}
          disabled={props?.disabled}
          type={props?.isPassword ? passwordFieldType : props?.type ?? "text"}
        />

        {props?.isPassword && (
          <div
            className={`${props?.replacementPasswordToggleBtnClassName ?? textInputStyles?.password_toggle_btn} ${props?.additionalPasswordToggleBtnClassName ?? ""}`}
            onClick={() =>
              setPasswordFieldType(
                passwordFieldType === "password" ? "text" : "password"
              )
            }
          >
            <Icon
              className={`${props?.replacementPasswordToggleBtnSvgClassName ?? textInputStyles?.password_toggle_btn_svg} ${props?.additionalPasswordToggleBtnSvgClassName ?? ""}`}
              type={
                iconMap?.[
                  `password_${passwordFieldType === "password" ? "on" : "off"}`
                ]
              }
            />
          </div>
        )}

        {props?.error && !props?.validationPills && (
          <div
            className={`${props?.replacementErrorMessageContainerClassName ?? textInputStyles?.error_message_container} ${props?.additionalErrorMessageContainerClassName ?? ""}`}
          >
            <div
              className={`${props?.replacementErrorIconClassName ?? textInputStyles?.error_icon} ${props?.additionalErrorIconClassName ?? ""}`}
            >
              <Icon
                className={`${props?.replacementErrorIconSvgClassName ?? textInputStyles?.error_icon_svg} ${props?.additionalErrorIconSvgClassName ?? ""}`}
                type={iconMap?.error_icon}
              />
            </div>
            <div
              className={`${props?.replacementErrorMessageClassName ?? textInputStyles?.error_message} ${props?.additionalErrorMessageClassName ?? ""}`}
            >
              {props?.errorMessage}
            </div>
          </div>
        )}

        {props?.validationPills &&
          !allPillsValidated({
            validators: props?.separateValidators,
            value: props?.value,
          }) && (
            <div
              className={`${props?.replacementValidationPillsContainerClassName ?? textInputStyles?.password_field_validation_pills_container} ${props?.additionalValidationPillsContainerClassName ?? ""}`}
            >
              {props?.separateValidators?.map((validator, idx) => {
                const isValid = new RegExp(validator.regex).test(props?.value);
                return (
                  <div
                    key={idx}
                    className={`${props?.replacementValidationPillIconContainerClassName ?? textInputStyles?.validation_pill_icon_container} ${isValid ? props?.replacementValidClassName ?? textInputStyles?.valid : props?.replacementInvalidClassName ?? textInputStyles?.invalid} ${props?.additionalValidationPillIconContainerClassName ?? ""}`}
                  >
                    <div
                      className={`${props?.replacementValidationPillIconClassName ?? textInputStyles?.validation_pill_icon} ${props?.additionalValidationPillIconClassName ?? ""}`}
                    >
                      <Icon
                        className={`${props?.replacementValidationPillIconSvgClassName ?? textInputStyles?.validation_pill_icon_svg} ${props?.additionalValidationPillIconSvgClassName ?? ""}`}
                        type={iconMap?.[`pill_${isValid ? "valid" : "invalid"}`]}
                      />
                    </div>
                    <div
                      className={`${props?.replacementValidationPillClassName ?? textInputStyles?.validation_pill} ${props?.additionalValidationPillClassName ?? ""}`}
                    >
                      {validator?.message}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
