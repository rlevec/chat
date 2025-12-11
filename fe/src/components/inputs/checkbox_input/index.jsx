import React from "react";

import checkboxInputStyles from "./styles/checkbox_input.module.css";

import Icon from "../../icon";

export default function CheckboxInput(props) {
  return (
    <div
      className={`${props?.replacementWrapperClassName ?? checkboxInputStyles?.wrapper} ${props?.additionalWrapperClassName ?? ""}`}
    >
      <div
        className={`${props?.replacementContainerClassName ?? checkboxInputStyles?.container} ${props?.additionalContainerClassName ?? ""}`}
      >
        <div
          className={`${props?.replacementInputContainerClassName ?? checkboxInputStyles?.input_container} ${props?.additionalInputContainerClassName ?? ""}`}
        >
          <input
            className={`${props?.replacementInputClassName ?? checkboxInputStyles?.input} ${props?.additionalInputClassName ?? ""} ${
              props?.error ? props?.replacementErrorClassName ?? checkboxInputStyles?.error : ""
            }`}
            checked={Boolean(props?.value)}
            onChange={(event) => props?.onCheck({ event })}
            type={"checkbox"}
          />

          {Boolean(props?.inputLabels) &&
            Array.isArray(props?.inputLabels) &&
            props?.inputLabels?.length > 0 && (
              <div
                className={`${props?.replacementLabelsContainerClassName ?? checkboxInputStyles?.labels_container} ${props?.additionalLabelsContainerClassName ?? ""}`}
              >
                {props?.inputLabels?.map((labelEntry, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`${props?.replacementLabelContainerClassName ?? checkboxInputStyles?.label_container} ${props?.additionalLabelContainerClassName ?? ""}`}
                    >
                      <div
                        className={`${props?.replacementLabelClassName ?? checkboxInputStyles?.label} ${props?.additionalLabelClassName ?? ""}`}
                      >
                        {labelEntry?.label}
                      </div>
                      {labelEntry?.link && (
                        <a
                          className={`${props?.replacementLabelWithLinkClassName ?? checkboxInputStyles?.label} ${props?.replacementLabelWithLinkExtraClassName ?? checkboxInputStyles?.label_with_link} ${props?.additionalLabelWithLinkClassName ?? ""}`}
                          href={labelEntry?.link}
                        >
                          {labelEntry?.labelWithLink}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {props?.error && (
          <div
            className={`${props?.replacementErrorMessageContainerClassName ?? checkboxInputStyles?.error_message_container} ${props?.additionalErrorMessageContainerClassName ?? ""}`}
          >
            <div
              className={`${props?.replacementErrorIconClassName ?? checkboxInputStyles?.error_icon} ${props?.additionalErrorIconClassName ?? ""}`}
            >
              <Icon
                className={`${props?.replacementErrorIconSvgClassName ?? checkboxInputStyles?.error_icon_svg} ${props?.additionalErrorIconSvgClassName ?? ""}`}
                type="ExclamationCircle"
              />
            </div>
            <div
              className={`${props?.replacementErrorMessageClassName ?? checkboxInputStyles?.error_message} ${props?.additionalErrorMessageClassName ?? ""}`}
            >
              {props?.errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
