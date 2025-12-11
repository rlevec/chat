import { useState } from "react";

import selectInputStyles from "./styles/select_input.module.css";

import { handleSelect, iconMap } from "./utils";

import Icon from "../../icon";

export default function SelectInput(props) {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div
      className={`${
        props?.replacementWrapperClassName ?? selectInputStyles?.wrapper
      } ${props?.additionalWrapperClassName ?? ""}`}
    >
      <div
        className={`${
          props?.replacementContainerClassName ?? selectInputStyles?.container
        } ${props?.additionalContainerClassName ?? ""}`}
      >
        {Boolean(props?.label) && (
          <label
            className={`${
              props?.replacementLabelClassName ?? selectInputStyles?.label
            } ${props?.additionalLabelClassName ?? ""}`}
          >
            {props?.label}
          </label>
        )}

        <div
          className={`${
            props?.replacementSelectClassName ?? selectInputStyles?.select
          } ${props?.additionalSelectClassName ?? ""} ${
            dropdownActive
              ? `${
                  props?.replacementSelectActiveClassName ??
                  selectInputStyles?.select_active
                } ${props?.additionalSelectActiveClassName ?? ""}`
              : ""
          }`}
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <div
            className={`${
              props?.replacementFieldContainerClassName ??
              selectInputStyles?.field_icon_value_placeholder_container
            } ${props?.additionalFieldContainerClassName ?? ""}`}
          >
            {iconMap?.[props?.frontendSlug] && (
              <div
                className={`${
                  props?.replacementFieldIconClassName ??
                  selectInputStyles?.field_icon
                } ${props?.additionalFieldIconClassName ?? ""}`}
              >
                <Icon
                  type={iconMap?.[props?.frontendSlug]}
                  className={`${
                    props?.replacementFieldIconSvgClassName ??
                    selectInputStyles?.field_icon_svg
                  } ${props?.additionalFieldIconSvgClassName ?? ""}`}
                />
              </div>
            )}

            <div
              className={`${
                props?.value
                  ? props?.replacementValueClassName ?? selectInputStyles?.value
                  : props?.replacementPlaceholderClassName ??
                    selectInputStyles?.placeholder
              } ${props?.additionalValueOrPlaceholderClassName ?? ""}`}
            >
              {props?.value
                ? props?.options?.find(
                    (option) => option?.value === props?.value
                  )?.name
                : props?.placeholder}
            </div>
          </div>

          <div
            className={`${
              props?.replacementToggleClassName ?? selectInputStyles?.toggle
            } ${props?.additionalToggleClassName ?? ""}`}
          >
            <Icon
              className={`${
                props?.replacementToggleSvgClassName ??
                selectInputStyles?.toggle_svg
              } ${props?.additionalToggleSvgClassName ?? ""}`}
              type={
                iconMap?.[`dropdown_${dropdownActive ? "active" : "inactive"}`]
              }
            />
          </div>
        </div>

        {dropdownActive && props?.options?.length > 0 && (
          <div
            className={`${
              props?.replacementOptionsClassName ?? selectInputStyles?.options
            } ${props?.additionalOptionsClassName ?? ""}`}
          >
            {props?.options?.map((option, idx) => (
              <div
                key={idx}
                className={`${
                  props?.replacementOptionClassName ?? selectInputStyles?.option
                } ${
                  props?.value === option?.value
                    ? props?.replacementOptionActiveClassName ??
                      selectInputStyles?.option_active
                    : ""
                } ${props?.additionalOptionClassName ?? ""}`}
                onClick={() =>
                  handleSelect({
                    onSelect: props?.onSelect,
                    dropdownActive,
                    value: option?.value,
                    frontendSlug: props?.frontendSlug,
                    setDropdownActive,
                  })
                }
              >
                {option?.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
