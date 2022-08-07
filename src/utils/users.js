const users=[]

// addUser, removeUser, getUser, getUsersInRoom 
const addUser=({id, username, room})=>{
    username= username.trim().toLowerCase();
    room= room.trim().toLowerCase();
    // validation
    if(username==='' || room===''){
        return {
            error : "User name and room name are Required !"
        } 
    }
    // existing user
    const existingUser = users.find((user)=>{
        return user.username===username && user.room===room;
    })
    if(existingUser){
        //console.log("Error in existingUser")
        return{
            error: "User name is already in use!"
        }
    }
    const user = {id, username, room}
    users.push(user)
    console.log(user)
    return {user}
}

const removeUser= (id)=>{
    const i = users.findIndex((user)=> user.id === id)
    if(i !== -1){
        return users.splice(i,1)[0]
    }
    //console.log("Remove User: "+i+"   id"+id)

}

const getUser= (id)=>{
    const i = users.findIndex((user)=> user.id===id)
    if(i === -1){
        return undefined
    }
    return users[i]
}

const getUsersInRoom = (room) =>{
    room=room.trim().toLowerCase();
    const room_users= []
    users.filter((user)=>{
        if(user.room === room){
            room_users.push(user)
        }
    })
    return room_users

}

module.exports = { addUser ,removeUser, getUser, getUsersInRoom }