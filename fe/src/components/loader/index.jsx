import React from "react";

import loaderStyles from "./styles/loader.module.css"

export default function Loader(props) {
    
      const loaderMap = {
          "circular": (
            <div className={`${loaderStyles?.circular} ${props?.additionalClassName}`}/>
          ),
          "fallback": (
                <div className={`${props?.additionalClassName}`}>Loading...</div>
          )
      }

      const loader = loaderMap?.[props?.type] ?? loaderMap?.fallback

      return loader
}