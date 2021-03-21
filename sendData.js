const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const timer = ()=>{
    let duracion = 0
    return new Promise ( resolve =>{
        const sendData =  setInterval((data) =>{
            duracion++
             data = {
                uuid:uuidv4(),
                name:"Oliver" + Math.floor(Math.random(1)*100)
            }
            fetch("http://localhost:8000/post/resource/memory/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => console.log('Success:', response));

              if(duracion===1){
                  resolve();
                  clearInterval(sendData)
              }
        },1000)
        
    }

    )
}


const main = ( async ()=>{
    console.log("starting...")
    await timer()

})();