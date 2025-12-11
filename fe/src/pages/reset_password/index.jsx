import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form";

export default function ResetPassword(props) {
  const { token } = props?.params || {};

  return (
    <Wrapper>
        <Form data={props?.data} token={token} component="reset_password" />
    </Wrapper>
  );
}
