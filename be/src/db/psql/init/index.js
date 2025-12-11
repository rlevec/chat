import { pool } from "../pool/index.js";
import { tables } from "../tables/index.js";
import { indexes } from "../indexes/index.js";

export async function init() {
  for (const table of tables) {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${table.name} (
        ${table.model}
      );
    `;

    await pool.query(createTableSQL);

    if (indexes[table.name]) {
      for (const idx of indexes[table.name]) {
        await pool.query(idx);
      }
    }
  }

  console.log("Tables and indexes ensured");
}
