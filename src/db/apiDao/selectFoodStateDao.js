import db from "../index.js"

export default function (vegetable_id) {
  return new Promise(((resolve, reject) => {
    db.query("SELECT quality FROM repo WHERE vegetable_id = ?", [vegetable_id], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }))
}
