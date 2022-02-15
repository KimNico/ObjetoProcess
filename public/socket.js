const socket= io();
socket.emit('getProductos')

const tableBody = document.getElementById('tbody');
const formularioBtn = document.getElementById('formularioBtn')
const chat = document.getElementById('chat')
const chatBtn = document.getElementById('chatBtn')
const chatMensaje = document.getElementById('chatMensaje')
const chatMail = document.getElementById('chatMail')


socket.on('lista', (data) => {

   if (!data.error && data.length > 0) {
     const htmlData = data.map((value) => {
       return `
         <tr>
             <td>${value.nombre}</td>
             <td>${value.precio}</td>
             <td><img class='img-thumbnail' style="width: 250px; height: 250px;" src='${value.foto}'> </td>
         </tr> `
     }).join(' ');
     tableBody.innerHTML = htmlData;
   }
 });


socket.on('mensaje',data =>{
   const date = new Date()
   const htmlData = data.map(value=>{
      return`<b>${value.email}</b>[<span> ${date.toDateString()}</span>]: <span>${value.message}`
   })
   chat.innerHTML = htmlData;
   chatMail.value = '';
   chatMensaje.value = '';
})

formularioBtn.addEventListener('click',()=>{
 socket.emit('productoNuevo');
})

chatBtn.addEventListener('click', e => {
   e.preventDefault();
   const date = new Date();
   if (chatMail.value === '') {
     alert('Ingrese un mail');
     return;
   }
   let info = {
     email: chatMail.value,
     date: date.toLocaleString(),
     msg: chatMensaje.value,
   }
   socket.emit('chatMensaje', info);
 });