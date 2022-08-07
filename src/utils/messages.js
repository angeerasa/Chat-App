const moment= require('moment')

const generateMessages= (text,username)=>{
    return {text,
    createdAt : moment(new Date().getTime()).format('LT'),
    username
    }
}

module.exports = {
    generateMessages
}