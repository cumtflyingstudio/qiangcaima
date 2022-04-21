import moment from "moment";
import getFoodDao from "../../db/apiDao/getFoodDao.js";
import getRandomIntInclusive from "../../utils/getRandomIntInclusive.js";
import insertMesDao from "../../db/apiDao/insertMesDao.js"
import selectFoodNameDao from "../../db/apiDao/selectFoodNameDao.js";
import {clients} from "../../app.js";

let qualityMap = new Map()


function handleAll(res) {
  for (const food of res) {
    if (qualityMap.has(food.quality)) {
      qualityMap.get(food.quality).push(food)
    } else {
      qualityMap.set(food.quality, [food])
    }
  }
  let rand = getRandomIntInclusive(1, 100)
  let resArr = []
  if (rand >= 66) {
    resArr = qualityMap.get("0")
  } else if (rand >= 41) {
    resArr = qualityMap.get("1")
  } else if (rand >= 21) {
    resArr = qualityMap.get("2")
  } else if (rand >= 6) {
    resArr = qualityMap.get("3")
  } else if (rand >= 1) {
    resArr = qualityMap.get("4")
  } else {
    resArr = qualityMap.get("0")
  }
  return resArr[getRandomIntInclusive(0, resArr.length - 1)]
}


export default async function (request, response) {
  if (request.query.username === ''||!request.query.username) {
    response.status(400)
    response.send({code: 400, message: "名字不能为空", data: null})
    return;
  }
  let res = await getFoodDao().catch(err => {
    console.log("抽奖数据库", err)
    response.status(500)
    response.send({code: 500, message: "服务器发送错误", data: null})
  })
  let chosed = handleAll(res)

  let current_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  insertMesDao({
    user_name: request.query.username,
    vegetable_id: chosed.vegetable_id,
    current_time
  })
    .catch(err => console.log("插入数据数据库", err))

  let foodName = await selectFoodNameDao(chosed.vegetable_id).catch(err => {
    console.log("查找菜名", err)
  })

  if (chosed.quality !== "0") {
    clients.forEach((socket) => {
      socket.emit("goodLuck", {...chosed, current_time,foodName, username: request.query.username});
    });
  }

  response.send({
    code: 200,
    message: null,
    data: chosed
  })
}

