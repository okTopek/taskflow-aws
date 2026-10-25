const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env

export const config = {
  port: PORT || 3000,
  db: {
    host: DB_HOST,
    port: DB_PORT || 5432,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
}

export function getDatabaseUrl() {
  const { host, port, name, user, password } = config.db
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${name}`
}
