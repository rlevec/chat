import { errorMiddleware } from "./error/index.js"
import { requestTimeout } from "./timeout/index.js"
import { authMiddleware } from "./auth/index.js"
import { noAuthMiddleware } from "./no_auth/index.js"

export const middlewares = {
    error: errorMiddleware,
    timeout: requestTimeout,
    auth: authMiddleware,
    no_auth: noAuthMiddleware
}