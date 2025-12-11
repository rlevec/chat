import React from "react";

import Wrapper from "../../components/wrapper";

import Form from "../../components/form"

export default function ResendActivation(props) {
    
    return (
        <Wrapper>
             <Form data={props?.data} component={"upload_profile_picture"} />
        </Wrapper>
    )
}