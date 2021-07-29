require('dotenv').config()
const bot = require('./bot')
const db = require('./models/index')

async function Notify(){const meetings = await db.Meeting.findAll()
  const meetInfo = meetings.map(function(meeting) {
    return [meeting, toTrueDays(meeting.get({plain: true}).days), meeting.get({plain: true}).time]
  })
  const nowDate = new Date()
  for (const element of meetInfo) {
    if(!element[1].includes(nowDate.getDay())) {
      continue
    }
    if(element[2].substr(0,5) === (new Date(nowDate.getTime() + 15*60*1000)).toLocaleTimeString().substr(0,5)){
     await sendNotification(15, element[0])
    }else if(element[2].substr(0,5) === (new Date(nowDate.getTime() + 30*60*1000)).toLocaleTimeString().substr(0,5)){
      await sendNotification(30, element[0])
    }
  }
}

Notify()

async function sendNotification(time, meeting){
  const project = await db.Project.findByPk(meeting.get({plain: true}).projectId)
  const employees = await project.getEmployees()
  const chatIDs = employees.map(function(employee){
    return employee.get({plain: true}).chatId
  })
  chatIDs.forEach(function(id){
    bot.telegram.sendMessage(id,`Через ${time} минут встреча: ${meeting.get({plain: true}).description}`)
  })
}

function toTrueDays(days){
    let arrayTrueDays = []
    const arrayDays = Array.from(days)
    for(let i = 0; i <= 6; i++){
        if(arrayDays[i] === '1'){
          arrayTrueDays.push(i+1)
        }
    }
    return arrayTrueDays
}


