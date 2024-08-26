import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function dbConnect() {
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  })

  await db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEST UNIQUE,
        content TEXT
      )
    `)

  return db
}