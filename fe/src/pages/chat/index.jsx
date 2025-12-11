import React from "react";

import ChatComponent from "../../components/chat";

export default function Chat(props) {

    return (
            <ChatComponent data={props?.data}/>
    )
}
