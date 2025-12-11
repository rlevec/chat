import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form";

export default function Login(props) {

  return (
    <Wrapper>
        <Form data={props?.data} component={"login"} />
    </Wrapper>
  );
}
