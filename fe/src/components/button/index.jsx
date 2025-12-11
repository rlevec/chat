import React from "react";

import buttonStyles from "./styles/button.module.css"

import Icon from "../icon";

export default function Button(props) {
    return (
        <button
            type={props?.type ?? "button"}
            disabled={props?.disabled ?? false}
            onClick={props?.onClick ?? (() => null)}
            className={`${props?.replacementClassName ?? buttonStyles?.btn} ${props?.additionalClassName ?? ""} ${props?.renderType ? buttonStyles?.[`${props?.renderType}`] : ""}`}
        >   {props?.iconType ? <Icon type={props?.iconType} className={props?.iconClassName} /> : null}
            {props?.title && <div className={props?.titleClassName}>{props?.title}</div>}
            </button>
    )
}