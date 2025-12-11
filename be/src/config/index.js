import dotenv from "dotenv"

dotenv.config()

export const config = {
    server_port: process.env.SERVER_PORT,
    psql_user: process.env.PSQL_USER,
    psql_host: process.env.PSQL_HOST,
    psql_database: process.env.PSQL_DATABASE,
    psql_port: parseInt(process.env.PSQL_PORT, 10),
    gmail_account: process.env.GMAIL_ACCOUNT,
    gmail_password: process.env.GMAIL_PASSWORD,
    jwt_secret: process.env.JWT_SECRET,
    fe_url: process.env.FE_URL,
    redis_port: process.env.REDIS_PORT
}