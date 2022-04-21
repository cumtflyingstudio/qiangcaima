import db from "../index.js"

export default function () {
  return new Promise(((resolve, reject) => {
    db.query("SELECT * FROM repo", (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }))
}
