import React, { useState } from "react";

import Image from "../../image";

import fileInputStyles from "./styles/file_input.module.css";

import { handleFileChange, handleFileDelete } from "./utils";

export default function FileInput(props) {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className={fileInputStyles?.wrapper}>
      <div className={fileInputStyles?.container}>
        <div className={fileInputStyles?.title}>{props?.label}</div>
        <input
          className={fileInputStyles?.input}
          id={props?.frontendSlug}
          type="file"
          name={props?.name}
          accept={props?.accept}
          onChange={(event) =>
            handleFileChange({
              event,
              setUploadedFile,
              onFileUpload: props?.onFileUpload,
            })
          }
        />
        {props?.value && uploadedFile && (
          <div
            onClick={() =>
              handleFileDelete({
                setUploadedFile,
                onFileDelete: props?.onFileDelete,
              })
            }
            className={fileInputStyles?.file_delete}
          >
            ×
          </div>
        )}
        {props?.value && uploadedFile ? (
          <Image
            additionalContainerClassName={fileInputStyles?.image_container}
            additionalImageClassName={fileInputStyles?.image}
            src={uploadedFile}
            alt={props?.frontendSlug}
            width={450}
            height={450}
          />
        ) : (
          <label
            className={fileInputStyles?.label}
            htmlFor={props?.frontendSlug}
          >
            {props?.labels?.map((labelEntry, idx) => {
              return (
                <div
                  key={idx}
                  className={`${fileInputStyles?.label_entry} ${
                    Array.isArray(labelEntry?.value) &&
                    labelEntry?.value?.length > 0
                      ? fileInputStyles?.label_entry_multi
                      : fileInputStyles?.label_entry_single
                  }`}
                >
                  <div className={fileInputStyles?.label_entry_title}>
                    {Array.isArray(labelEntry?.value) &&
                    labelEntry?.value?.length > 0
                      ? labelEntry?.title
                      : `${labelEntry?.title}:`}
                  </div>
                  <div className={fileInputStyles?.label_entry_value_container}>
                    {Array.isArray(labelEntry?.value) &&
                    labelEntry?.value?.length > 0 ? (
                      labelEntry?.value?.map((valueEntry, i) => {
                        return (
                          <div
                            key={i}
                            className={labelEntry?.label_entry_value}
                          >
                            {valueEntry}
                          </div>
                        );
                      })
                    ) : (
                      <div className={labelEntry?.label_entry_value}>
                        {labelEntry?.value}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </label>
        )}
      </div>
    </div>
  );
}
