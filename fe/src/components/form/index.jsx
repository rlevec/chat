import React, { useState } from "react";

import formStyles from "./styles/form.module.css";

import { Link } from "../link";
import Button from "../button";
import SelectInput from "../inputs/select_input";
import TextInput from "../inputs/text_input";
import CheckboxInput from "../inputs/checkbox_input";
import FileInput from "../inputs/file_input";

import { useAPI } from "../../api";
import { useWindowDimension } from "../../hooks";

import {
  submit,
  handleChange,
  handleSelect,
  handleCheck,
  handleFileUpload,
  handleFileDelete,
  buttonDisabled,
} from "./utils";

export default function Form(props) {

  const { deviceType } = useWindowDimension();

  const {
    post: submitFormPostRequest,
    data: submitFormData,
    loading: submitFormLoading,
    error: submitFormError,
  } = useAPI();

  const [query, setQuery] = useState(null);

  const [fieldError, setFieldError] = useState(null);

  return (
    <div
      className={`${formStyles?.wrapper} ${
        props?.additionalWrapperClassName ?? ""
      } ${
        submitFormData
          ? submitFormData?.success
            ? formStyles?.wrapper_response_success
            : formStyles?.wrapper_response_error
          : ""
      } ${formStyles?.[deviceType]}`}
      key={`${props?.component}_form_data`}
    >
      <div className={formStyles?.container}>
        <form
          className={formStyles?.form}
          onSubmit={(event) =>
            submit({
              event,
              fields: props?.data?.fields,
              query,
              fieldError,
              token: props?.token,
              isFormData: Boolean(props?.data?.isFormData),
              component: props?.component,
              submitFormPostRequest,
            })
          }
        >
          {Boolean(props?.data?.header) && (
            <div className={formStyles?.header}>{props?.data?.header}</div>
          )}
          {submitFormData && (
            <div
              className={`${formStyles?.response} ${
                submitFormData?.success
                  ? formStyles?.response_success
                  : formStyles?.response_error
              }`}
            >
              {submitFormData?.message}
            </div>
          )}
          {Boolean(props?.data?.description) && (
            <div className={formStyles?.description}>
              {props?.data?.description}
            </div>
          )}
          {props?.data?.fields?.length > 0 && (
            <div className={formStyles?.fields}>
              {props?.data?.fields?.map?.((field, idx) => {
                return (
                  <div key={idx} className={formStyles?.field_group}>
                    {field?.inputType === "text" && (
                      <TextInput
                        {...field}
                        error={
                          query?.[field?.frontendSlug] === "" ||
                          fieldError?.[field?.frontendSlug]
                        }
                        errorMessage={
                          query?.[field?.frontendSlug] === ""
                            ? field?.requiredMessage
                            : field?.validationMessage
                        }
                        value={query?.[field?.frontendSlug] ?? ""}
                        onChange={(params) =>
                          handleChange({
                            ...params,
                            field,
                            setQuery,
                            setFieldError,
                          })
                        }
                      />
                    )}
                    {field?.inputType === "select" && (
                      <SelectInput
                        {...field}
                        value={query?.[field?.frontendSlug] ?? ""}
                        onSelect={(params) =>
                          handleSelect({
                            ...params,
                            field,
                            setQuery,
                            setFieldError,
                          })
                        }
                      />
                    )}
                    {field?.inputType === "file" && (
                      <FileInput
                        {...field}
                        onFileUpload={(params) =>
                          handleFileUpload({
                            ...params,
                            field,
                            setQuery,
                            setFieldError,
                          })
                        }
                        onFileDelete={() =>
                          handleFileDelete({ field, setFieldError, setQuery })
                        }
                        value={query?.[field?.frontendSlug] ?? null}
                      />
                    )}
                    {field?.inputType === "checkbox" && (
                      <CheckboxInput
                        {...field}
                        errorMessage={field?.requiredMessage}
                        error={fieldError?.[field?.frontendSlug]}
                        onCheck={(params) =>
                          handleCheck({
                            ...params,
                            field,
                            setFieldError,
                            setQuery,
                          })
                        }
                        value={query?.[field?.frontendSlug] ?? ""}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {props?.data?.links?.length > 0 && (
            <div className={formStyles?.links}>
              {props?.data?.links?.map((link, idx) => {
                return (
                  <div key={idx} className={formStyles?.link_item}>
                    <div>{link?.label}</div>
                    <Link to={link?.route ?? "#"}>{link?.labelWithLink}</Link>
                  </div>
                );
              })}
            </div>
          )}
          <div className={formStyles?.actions}>
            <Button
              disabled={buttonDisabled({
                fields: props?.data?.fields,
                query,
                fieldError,
                response: submitFormData,
              })}
              type={props?.data?.button?.type ?? "submit"}
              renderType={"primary"}
              title={props?.data?.button?.title}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
