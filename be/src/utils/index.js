import { throwNewError } from "./throw_new_error/index.js"
import { shutdown } from "./shutdown/index.js"
import { formatTimestamp } from "./format_timestamp/index.js"

export const utils = {
    throw_new_error: throwNewError,
    shutdown,
    format_timestamp: formatTimestamp
}