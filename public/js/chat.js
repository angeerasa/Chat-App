// CLIENT
//Constants
const socket=io()
const $form = document.querySelector('.frm')
const $submit_button= document.querySelector('form input#btn')
const $text_field= document.querySelector('form input#txt')
const $location_button= document.querySelector('body button#location')
const $messages= document.querySelector('#messages')
const $sidebar = document.querySelector('.chat__sidebar')

// Template Constants
const messageTemplate= document.querySelector('#message-template').innerHTML;
const messageTemplate2=document.querySelector('#message-template-2').innerHTML;
const sideBarTemplate= document.querySelector('#sidebar-template').innerHTML;

// autoscroll feature
const autoscroll = ()=>{
    const $newMessage = $messages.lastElementChild
    const $newMessageHeight = $newMessage.offsetHeight + parseInt(getComputedStyle($newMessage).marginBottom)

    const visibleHeight= $messages.offsetHeight;
    const containerHeight = $messages.scrollHeight
    const scrollOffset = $messages.scrollTop + visibleHeight
    if(containerHeight - $newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}


const {username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit('join',{username , room},(e)=> {
    if(e){
        location.href = '/';
        alert(e)
    }
})

socket.on('room_data',({ room , users})=>{
    // render newly created template
    const html=Mustache.render(sideBarTemplate,{
        room: room,
        users: users
    })
    $sidebar.innerHTML= html;
})

socket.on('display',(val,callback)=>{
    $text_field.value=''
    const html= Mustache.render(messageTemplate,{
        time: val.createdAt,
        message: val.text,
        UserName: val.username
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
    callback()
})

socket.on('locationMessage',(url)=>{
    const html_location= Mustache.render(messageTemplate2,{
        time:url.createdAt,
        location: url.text
    })
    $messages.insertAdjacentHTML('beforeend',html_location)
    autoscroll()
})

$form.addEventListener('submit',(e)=>{
    e.preventDefault();
    socket.emit('message',$text_field.value,acknowledge($submit_button));
    $text_field.value=''
})

$location_button.addEventListener('click',()=>{
    let long=0;
    let lati=0;
    $location_button.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        long= position.coords.longitude;
        lati= position.coords.latitude;
       // socket.emit('message',`https://www.openstreetmap.org/#map=18/${lati}/${long}`,acknowledge($location_button))
        socket.emit('sendLocation',`https://www.google.com/maps/search/?api=1&query=${lati}%2C${long}`,acknowledge($location_button))
    },(error)=>{
        console.log(error)
    })
    
})

function acknowledge(but){
    try{
        but.removeAttribute('disabled')
    }catch(e){
        console.log("Unable to Acknowledge")
    }
    console.log("Acknowledged");
}