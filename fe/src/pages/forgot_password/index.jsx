import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form";

export default function ForgotPassword(props) {
    return (
        <Wrapper>
            <Form data={props?.data} component={"forgot_password"} />
        </Wrapper>
    )
}
