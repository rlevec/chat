import React from "react";

import wrapperStyles from "./styles/wrapper.module.css";

export default function Wrapper({ children }) {
  return (
    <div className={wrapperStyles.wrapper}>
      <div className={wrapperStyles.container}>
        {children}
      </div>
    </div>
  );
}