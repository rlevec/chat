import { decode } from "./decode/index.js";
import {expiration} from "./expiration/index.js"
import {sign} from "./sign/index.js"
import {validate} from "./validate/index.js"
import {verify} from "./verify/index.js"
import { refresh } from "./refresh/index.js";
import { deleteToken } from "./delete/index.js";

export const json_web_token = {
    decode,
    expiration,
    sign,
    validate,
    verify,
    refresh,
    delete: deleteToken
}