import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form"

export default function ChangePassword(props) {
    
    return (
        <Wrapper>
             <Form data={props?.data} component={"change_password"} />
        </Wrapper>
    )
}