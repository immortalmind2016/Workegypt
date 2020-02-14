
const axios=require("axios")

const sendPostRequest=(url,data)=>new Promise((resolve,reject)=>{
    axios.post(url,data).then((response)=>{
        resolve(response)
    }).catch((e)=>{
        reject(e)
    })
})


module.exports={
    sendPostRequest
}