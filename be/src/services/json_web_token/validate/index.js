import {utils} from "../../../utils/index.js"

export const validate = ({payload}) => {
    if (!payload.id) {
        utils?.throw_new_error(
        400,
        "Payload must include 'id' to sign a token."
      );
    }
  };