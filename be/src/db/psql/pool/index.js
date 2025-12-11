import { config } from "../../../config/index.js";
import { Pool } from "pg";

const pool = new Pool({
  user: config?.psql_user,
  host: config?.psql_host,
  database: config?.psql_database,
  port: config?.psql_port
});

export { pool };
