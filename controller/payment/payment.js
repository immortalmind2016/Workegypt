const User=require("../../model/user")
var randomstring = require("randomstring");
const {sendPostRequest}=require("../services/payment")
const axios=require("axios")
/*const setPaymentData=(req,res,err)=>{

    "apartment": "803", 
    "email": "claudette09@exa.com", 
    "floor": "42", 
    "first_name": "Clifford", 
    "street": "Ethan Land", 
    "building": "8028", 
    "phone_number": "+86(8)9135210487", 
    "shipping_method": "PKG", 
    "postal_code": "01898", 
    "city": "Jaskolskiburgh", 
    "country": "CR", 
    "last_name": "Nicolas", 
    "state": "Utah"
}*/
const deleteOrder=async(req,res,err)=>{
    const user=await User.findOne({_id:req.user._id})
    if(!user){
        return res.sendStatus(401);
    }
   await axios.delete("/api/ecommerce/orders/"+user.payment.order_id)
   user.save()

}
const subscribe=async(req,res,err)=>{
    console.log("subscribe")
    const plan=req.body.data.plan
    ,amount=0,
    limit=0
    
    switch(plan){
        case "gold":
            amont=process.env.GOLD_AMOUNT
            limit=process.env.GOLD_LIMIT
            break;
        case "silver":
            amont=process.env.SILVER_AMOUNT
            limit=process.env.SILVER_LIMIT
            break;
        case "platinum":
            amont=process.env.PLATINUM_AMOUNT
            limit=process.env.PLATINUM_LIMIT
            break;
    }
    const user=await User.findOne({_id:req.user._id})
    if(!user){
        return res.sendStatus(401);
    }
    let data={
        "auth_token": process.env.AUTH_TOKEN, // auth token obtained from step1
        "delivery_needed": "false",
        "merchant_id": process.env.MARCHANT_ID,      // merchant_id obtained from step 1
        "amount_cents": amount,
        "currency": "EGP",
        //"merchant_order_id": user._id,  // unique alpha-numerice value, example: E6RR3
        "items": [],
        
      }
    console.log(user)
    const order_request=await sendPostRequest("https://accept.paymobsolutions.com/api/ecommerce/orders",data)
    const order_id=order_request.id
    user.payment.order_id=order_id
    user.payment.request_plan=plan
    user.save()
    data={
        "auth_token":process.env.AUTH_TOKEN, // auth token obtained from step1
        "amount_cents":amount, 
        "expiration": 3600, 
        "order_id": order_id,    // id obtained in step 2
        "billing_data": {
          "apartment": user.payment.apartment, 
          "email": user.email, 
          "floor": user.payment.floor, 
          "first_name": user.payment.first_name, 
          "street":user.payment.street, 
          "building": user.payment.building,
          "phone_number":user.payment.phone_number, 
          "shipping_method": "PKG", 
          "postal_code": user.payment.postal_code, 
          "city": user.payment.city, 
          "country": user.payment.country, 
          "last_name": user.payment.last_name, 
          "state": user.payment.state
        }, 
        "currency": "EGP", 
        "integration_id": process.env.INTEGRATION_ID,  // card integration_id will be provided upon signing up,
        "lock_order_when_paid": "false" // optional field (*)
      }
    const car_payment=await sendPostRequest("https://accept.paymobsolutions.com/api/acceptance/payment_keys",data)
    console.log(car_payment.data)
    res.json({token:car_payment.data.token})
}
module.exports={
   subscribe,
   deleteOrder
}

