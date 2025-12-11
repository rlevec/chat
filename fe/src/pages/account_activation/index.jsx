import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form"

export default function AccountActivation(props) {

    const { token } = props?.params || {}; 

    return (
        <Wrapper>
             <Form data={props?.data} token={token} component={"account_activation"} />
        </Wrapper>
    )
}
