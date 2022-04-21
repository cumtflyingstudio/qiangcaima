import mysql from "mysql2"

export default mysql.createPool({
  host: '',
  port: '',
  user: '',
  password: '',
  database: ''
})

