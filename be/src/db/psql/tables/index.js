import { models } from "../models/index.js";

export const tables = [
    {
        model: models?.user,
        name: "users"
    },
    {
        model: models?.contact,
        name: "contacts"
    },
    {
        model: models?.message,
        name: "messages"
    },
]