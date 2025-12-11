import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form"

export default function ChangeUsername(props) {
    
    return (
        <Wrapper>
             <Form data={props?.data} component={"change_username"} />
        </Wrapper>
    )
}