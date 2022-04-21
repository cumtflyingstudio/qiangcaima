import db from "../index.js"

export default function ({user_name, vegetable_id, current_time:insert_time}) {
  return new Promise(((resolve, reject) => {
    db.query("INSERT INTO ticket set ?", {
      user_name,
      vegetable_id,
      insert_time
    }, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }))
}
