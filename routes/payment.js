const Router=require("express").Router()
const {subscribe,deleteOrder}=require("../controller/payment/payment")
const passport=require("../services/jwtPassport")

/*


required data
{
    data:{
        plan:"gold"
    }
}
*/
Router.post("/subscribe",passport.authenticate('jwt', { session: false }),subscribe)
Router.delete("/delete-last-order/",passport.authenticate('jwt', { session: false }),deleteOrder)

Router.get("/process_callback",(err,req,res)=>{
    console.log("PROCESS CALLBACK ",req.body)
})
Router.get("/response_callback",(err,req,res)=>{
    console.log("response_callback ",req.body)
})
module.exports=Router;