var jwt = require("jsonwebtoken");
const User = require("../../model/user");
const Applicant_profile = require("../../model/Applicant_profile");
const Company_profile = require("../../model/Company_profile");
const Notification = require("../../model/Notification");
const { sendMessage, forgetPasswordSendEmail } = require("../../services/sendgrid");
var randomstring = require("randomstring");
const getNotifications = async (req, res, err) => {
  const { page } = req.params;
  const limit = 10;
  const skip = page * limit;
  const results = await Promise.all([
    Notification.find({
      user: req.user._id,
      isRead: false,
    })
      .skip(skip)
      .limit(limit),
    Notification.find({
      user: req.user._id,
      isRead: false,
    }).count(),
  ]);

  res.json({
    notifications: results[0],
    totalCount: results[1],
  });
};
const setReadNotification = async (req, res, err) => {
  await Notification.findOneAndUpdate(
    {
      ...{
        ...(req.body.notificationId ? { notificationId: req.body.notificationId } : { _id: req.body._id }),
      },
      user: req.user._id,
      isRead: false,
    },
    {
      isRead: true,
    }
  );
  return res.sendStatus(200);
};
const { subscribeToTopic } = require("../../services/fcm");

const signupUser = (req, res, err) => {
  console.log("SING UYP");
  const { email, password, name, type, FCM_token } = req.body.data;
  if (FCM_token) {
    subscribeToTopic(FCM_token, type ? "1" : "0")
      .then(function (response) {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        subscribeToTopic(FCM_token, "2");

        console.log("Successfully subscribed to topic:", response);
      })
      .catch(function (error) {
        console.log("Error subscribing to topic:", error);
      });
  }
  let newUser = new User({
    email,
    password,
    name,
    FCM_token,
    type,
    ...(type && { subscribe: { count: 0, type: "none" }, period: null }),
    confirmation_token: randomstring.generate(7),
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (!err) {
      const to = req.body.data.email;
      //                 from = "Workegypt <dev@workegypt.net>",
      //                 subject = "confirmation";
      //             (text = ""),
      //                 (html = `
      //     <div style="text-align: center;">
      //     <h3>you are welcome ${user.name}</h3>
      //     <h4>to confirm you email copy the following code</h4>
      //     <div style="margin:auto;background: #00326F;color: white;font-weight: bold;width: fit-content;border-radius: 0px;padding: 20px;">
      //     ${user.confirmation_token}
      //     </div>
      //     <br>
      //     <span>thank you ! </span>
      // <script>

      //     </script>

      // </div>

      //     `);*/
      try {
        console.log("SEND EMAIL")
        sendMessage(to, user.confirmation_token, name);
      } catch (e) {
        console.log(e);
      }
      /*sendEmail({ to, subject, text, html, from })
                .then(() => {
                    //res.sendStatus(200)
                })
                .catch((error) => {
                    // res.json({error})
                });
*/
      if (type == 0) {
        new Applicant_profile({
          user: user._id,
        }).save(err, (profile) => {
          res.sendStatus(200);
        });
      } else if (type == 1) {
        new Company_profile({
          user: user._id,
        }).save(err, (profile) => {
          res.sendStatus(200);
        });
      }
    } else {
      res.sendStatus(401);
    }
  });
};

const signinUser = (req, res, err) => {
  const { email, password } = req.body.data;
  console.log(req.body.data);

  User.findOne({ email }, async (err, user) => {
    if(!user){
      return res.status(404).json({ error: "wrong email or password", code: "#2" });
    }
    if (!user || !(await user.checkPassword(password))) {
      return res.status(404).json({ error: "wrong email or password", code: "#2" });
    }

    let user_ = user;

    let token = jwt.sign({ ...user_, password: null }, "secret", { expiresIn: "365d" });

    if (user.confirmed) {
      console.log("EMAIL CONFIRMED");
     return res.json({
        token: "Bearer " + token,
        name: user.name,
        type: user.type,
      });
    } else {
      let confirmation_token = req.body.data.confirmation_token;
      if (!req.body.data.confirmation_token) {
        return res.status(401).json({ error: "confirm your email", code: "#0" });
      }
      if (confirmation_token == user.confirmation_token) {
        console.log("EMAIL CONFIRMATION_TOKEN  EQUAL INCOMING");

        user.confirmed = true;

        res.json({
          token: "Bearer " + token,
          name: user.name,
          type: user.type,
        });
        user.save();
      } else {
        console.log("EMAIL CONFIRMATION_TOKEN  EQUAL INCOMING");

        res.status(401).json({
          error: "wrong confirmation code",
          code: "#1",
        });
      }
    }

    /*  if(user){
         let user_=user
            let token= jwt.sign({...user_},"secret",{ expiresIn: '365d' })
            console.log(token)
            res.json({token:"Bearer "+token,name:user.name,type:user.type})
        }else{
            res.status(404).json({error:"wrong email or password",code:"#2"})
        }*/
  });
};

const getUser = (req, res, err) => {
  let type = req.user.type;
  let FCM_token = req.user.FCM_token;
  if (req.user.FCM_token)
    subscribeToTopic(FCM_token, type ? "1" : "0")
      .then(function (response) {
        subscribeToTopic(FCM_token, "2");

        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log("Successfully subscribed to topic:", response);
      })
      .catch(function (error) {
        console.log("Error sbscribing to topic:", error);
      });
  if (!req.user.type)
    Applicant_profile.findOne({ user: req.user._id }, (err, profile) => {
      if (profile) {
        return res.json(profile);
      } else {
        return res.status(404).json({
          error: "applicant profile not found",
          code: "#100",
        });
      }
    }).populate("user");
  else if (req.user.type) {
    console.log("COMPANY");
    Company_profile.findOne({ user: req.user._id }, (err, profile) => {
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({
          error: "company profile not found",
          code: "#100",
        });
      }
    }).populate("user");
  }
};
const editUser = async (req, res, err) => {
  console.log("BODY ", req.body.data);
 try{
  let user = await User.findOneAndUpdate({ _id: req.user._id }, { ...req.body.data }, { new: true });
  if(req.data.password){
  await user.save();
  }
  return res.json({success:true})
 }catch(e){

  return res.status(404).json({ error: e.message});
}
};

const forgetPassword = (req, res, err) => {
  User.findOne({ email: req.body.data.email }, (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
   
    const to = req.body.data.email;
    //     (from = "Workegypt <dev@workegypt.net>"), (subject = "forget password");
    //     (text = ""),
    //         (html = `
    //     <div style="text-align: center;">
    //     <h3>you are welcome</h3>
    //     <h5>your email is ${req.body.data.email}</h5>
    //     <h4>your password is :</h4>
    //     <div style="margin:auto;background: #00326F;color: white;font-weight: bold;width: fit-content;border-radius: 0px;padding: 20px;">
    //     ${user.password}
    //     </div>
    //     <br>
    //     <span>we recommend  to change your password</span>
    // <script>

    //     </script>

    // </div>

    //     `);

    let link = `${process.env.ROOT_URL}/reset?token=${jwt.sign(
      { id: user._id, type: "reset_password" },
      process.env.JWT_RESETPASSWORD_SECRET,
      { expiresIn: "7d" }
    )}`;
    forgetPasswordSendEmail(to, link, user.name)
      .then(() => {
        console.log("SEND EMAIL forgetPasswordSendEmail");
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("SEND EMAIL ERROR ", JSON.stringify(error,null,2));

        res.json({ error });
      });
  });
};

const resendConfirmation = (req, res, err) => {
  User.findOne({ email: req.body.data.email }, (err, user) => {
    if (!user) {
      res.status(404).json({ error: "user not found", code: "#100" });
    }
    console.log("SEND MAIL");
    const to = req.body.data.email;
    //         from = "Workegypt <dev@workegypt.net>",
    //         subject = "confirmation";
    //     (text = ""),
    //         (html = `
    //     <div style="text-align: center;">
    //     <h3>you are welcome ${user.name}</h3>
    //     <h4>to confirm you email copy the following code</h4>
    //     <div style="margin:auto;background: #00326F;color: white;font-weight: bold;width: fit-content;border-radius: 0px;padding: 20px;">
    //     ${user.confirmation_token}
    //     </div>
    //     <br>
    //     <span>thank you ! </span>
    // <script>

    //     </script>

    // </div>

    //     `);
    sendMessage(to, user.confirmation_token, user.name)
      .then(() => {
        console.log("EMAIL SENT RESEND TRUE");
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("ERROR ", error);
        res.json({ error });
      });
  });
};
const resetPassword = async (req, res, err) => {
  const { token, newPassword } = req.body;
  const data = jwt.verify(token, process.env.JWT_RESETPASSWORD_SECRET);
  try {
    let user = await User.findOne({ _id: data.id });
    console.log(user, "USER");
    user.password = newPassword;
    user.save();
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};
module.exports = {
  signinUser,
  signupUser,
  editUser,
  getUser,
  forgetPassword,
  resendConfirmation,
  getNotifications,
  setReadNotification,
  resetPassword,
};
