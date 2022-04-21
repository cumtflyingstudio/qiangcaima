import db from "../index.js"

export default function () {
  return new Promise(((resolve, reject) => {
    db.query("SELECT * FROM ticket ORDER BY insert_time DESC LIMIT 0,5", (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }))
}
