const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Applicant_profile=new Schema({
    job_title:{
        type:String,
        default:null
    }, 
    skills:Array
    ,
    basic_info:{
        age:Number,
        graduated:String,
        live_in:String
    },
    experience:Array,
    education:Array,
    languages:Array,
    certifications:Array,
    cv_url:String,
    basic_score:Number,
    main_lang:String,
    basic_quizes:Array,
    last_update:{
      type:Date,
      default:null
  },
    score:{
      type:Object,
      default:
        {
          en:""
       ,
          sp:""
        ,
          ge:""
      ,
          fr:""
        ,
          it:""
        ,
          ch:""
       ,
          ja:""
        ,
          po:""
        }

      
    },
    tested:false,
    questions:{
        type:Object,
        default:{
            en: [
              { title: "Can you tell me a little about yourself?", link: "" },
              {
                title:
                  "Tell me about a challenge or conflict you've faced at work or at life, and how you dealt with it.",
                link: ""
              },
              { title: "How would your boss and co-workers describe you?", link: "" },
              { title: "What is your greatest accomplishment?", link: "" },
              { title: "What are your goals for the future?", link: "" }
            ],
            sp: [
              { title: "¿Podría hablarme sobre usted?", link: "" },
              { title: "¿Cuáles son sus mayores virtudes o fortalezas?", link: "" },
              {
                title: "¿Dónde se ve en un futuro? ¿Cuáles son sus objetivos laborales?",
                link: ""
              },
              {
                title:
                  "Hábleme de algún problema al que se haya enfrentado y cómo lo resolvió",
                link: ""
              },
              { title: "¿Cuál ha sido su mayor logro profesional?", link: "" }
            ],
            ge: [
              { title: "Erzählen Sie mir etwas über sich.", link: "" },
              { title: "Was sind Ihre Stärken? Was sind Ihre Schwächen?", link: "" },
              {
                title:
                  "Was war für Sie bisher die größte Herausforderung in Ihrem Berufsleben?",
                link: ""
              },
              {
                title:
                  "Wenn Sie wählen könnten, an welchem Ort der Erde würden Sie jetzt am liebsten sein?",
                link: ""
              },
              { title: "Wo sehen Sie sich in fünf Jahren?", link: "" }
            ],
            fr: [
              { title: "Parlez-moi de vous.", link: "" },
              { title: "Où vous voyez-vous dans cinq ans ?", link: "" },
              { title: "Quels sont vos centres d’intérêt ?", link: "" },
              { title: "Quels sont vos points forts ?", link: "" },
              { title: "Quels sont vos points forts ?", link: "" }
            ],
            it: [
              { title: `Puoi dirmi qualcosa di te?`, link: `` },
              {
                title: `parlami di quella volta in cui hai dovuto affrontare dei conflitti al lavoro o nella vita?`,
                link: ``
              },
              { title: `dove ti vedi tra 5 anni?`, link: `` },
              {
                title: `Qual è il tuo più grande successo nella vita o lavoro?`,
                link: ``
              },
              { title: `Come descrivere se stessi?`, link: `` }
            ],
            ch: [
              {
                title: `你能告诉我一些关于你自己的事吗？`,
                link: ""
              },
              { title: `你认为什么是你的优点和缺点？`, link: "" },
              { title: `告诉我一个你在工作上克服挑战的经验。- 还是生活`, link: "" },
              { title: `你对你未来五年怎么打算呢?`, link: "" },
              { title: `你的事业目标是什么？`, link: "" }
            ],
            Ja: [
              { title: `をおいいたします。`, link: "" },
              { title: `→ あなたの/をえてください。`, link: "" },
              { title: `→ のはありますか。`, link: "" },
              { title: `→ あなたのについてえてください。`, link: "" },
              { title: `→ でたことはですか。`, link: "" }
            ],
            ru: [
              { title: `пожалуйста, представьтесь?`, link: "" },
              {
                title: `Расскажите мне о вызове или конфликте, с которым вы столкнулись на работе или в жизни, и о том, как вы с ним справились.`,
                link: ""
              },
              { title: `Как бы вы описали себя?`, link: "" },
              { title: `какой у тебя план на будущее?`, link: "" },
              { title: `Какое ваше самое большое достижение?`, link: "" }
            ],
            po: [
              { title: `Powiedz mi coś o sobie`, link: "" },
              {
                title: `Jakie są Twoje mocne strony? I Jakie są Twoje słabe strony?`,
                link: ""
              },
              { title: `Co chciałbyś robić za 5 lat?`, link: "" },
              {
                title: `Jaki etap w Twoim życiu był dla Ciebie najtrudniejszy? Jak sobie poradziłeś?`,
                link: ""
              },
              { title: `Co byś zrobił, gdybyś wygrał na loterii?`, link: "" }
            ],
            br: [],
            du: []
          }
          
    },
    image:{
        type:String,
        default:null
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    //update
    nationality:{
      type:String
    },
    marital_status :{
      type:String
    },
    number_of_dependents:{
      type:String
    },
    military_status :{
      type:String
    },
    driving_license:{
      type:String
    },
    your_contact_info:{
      type:Object,
      default:{
        mobile_number:"",
        alternative:""
      }
    },
    minimum_salary:{
      type:String
    },
    hide_salary:{
      type:Boolean,
      default:false
    },
    current_career_level:{
      type:String
    },
    current_education_level:{
      type:String
    },
    what_would_like_to_work:{
      type:Array,
      default:[]
    },
 


   



})


module.exports=mongoose.model("Applicant_profile",Applicant_profile)



/**
 * const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Applicant_profile=new Schema({
    job_title:{
        type:String,
        default:null
    }, 
    skills:[{name:String}]
    ,
    basic_info:{
        age:Number,
        graduated:String,
        live_in:String
    },
    experience:[{
        title:String,
        at:String,
        location:String,
        from:Date,
        to:Date
    }],
    education:[{
        at:String,
        titld:String,
        location:String,
        from:Date,
        to:Date 
    }],
    languages:[{
        title:String,
        Score:String,
    }],
    certifications:[{
        title:String,
        at:String,
        time:Date 
        
    }],
    cv_url:String,
    basic_quizes:[{
        languages:String,
        score:Number
    }],
   
   
    image:{
        type:String,
        default:null
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
   



})


module.exports=mongoose.model("Applicant_profile",Applicant_profile)
 * 
 */