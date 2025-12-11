import React from "react";

import { useRouter } from "../../context/router";

export function Link({ to, children }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate({path: to});
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
