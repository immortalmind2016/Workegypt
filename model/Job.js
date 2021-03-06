const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Job = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    requirements: String,
    experience: String,
    level: String,
    language: String,
    salary: String,
    type: String,
    video: String,

    working_hours: {
      type: String,
    },
    positions: String,
    languages: String,
    lang_score: String,
    open: {
      type: Boolean,
      default: true,
    },
    draft: {
      type: Boolean,
      default: false,
    },
    quiz_time: { type: Number, default: 60 },
    quiz: [
      {
        id: String,
        question: String,
        answer1: String,
        answer2: String,
        answer3: String,
        answer4: String,
        isRight1: Boolean,
        isRight2: Boolean,
        isRight3: Boolean,
        isRight4: Boolean,
      },
    ],
    applicants: [
      {
        applicant: {
          type: Schema.Types.ObjectId,
          ref: "Applicant_profile",
        },
        status: {
          type: String,
          default: "init",
        },
        quiz_score: {
          type: String,
        },
        answers: {
          default: Array(),
          default: [],
        },
      },
    ],
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company_profile",
    },
    //UPDATE
    job_type: String, //job or internship
    location: String,
    city: String,
    Area: String,
    career_level: String,
    years_of_experience: String,
    salary_range: {
      type: Object,
      default: {
        from: "",
        to: "",
      },
    },
    number_of_vacancies: Number,
    job_role: String,

    hide_salary: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_date" } }
);

module.exports = mongoose.model("Job", Job);
