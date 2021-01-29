const server = "http://localhost:5000/";
export const socketUrl = "http://localhost:5000";

export const uris = {
  user: {
    login: `${server}api/user/signin`, //post
    register: `${server}api/user/signup`, //post
    editAccount: `${server}api/user/edit`, //put
    getUserData: `${server}api/user`, //${id}
    confirmPassword: `${server}api/user/resend-code`,
    forgotPassword: `${server}api/user/forget-password`,
    resetPassword: `${server}api/user/reset-password`,
  },
  profile: {
    getApplicant: `${server}api/profile/applicant`, //${id} get
    editApplicant: `${server}api/profile/applicant`, //put request
    uploadApplicantImg: `${server}api/profile/applicant/upload-image`,
    uploadApplicantVideo: `${server}api/profile/applicant/upload-video`,
    getCompany: `${server}api/profile/company`, //${id} get
    editCompany: `${server}api/profile/company`, //put request
    uploadCompanyImg: `${server}api/profile/company/upload-image`,
    uploadCompanyVideo: `${server}api/profile/company/upload-video`,
    uploadCv: `${server}api/profile/applicant/upload-cv`,
    getSomeProfiles: `${server}api/company/profiles/`, //takes pagination index
  },
  job: {
    createJob: `${server}api/job`, //              POST
    getAllJobs: `${server}api/job/search/`, //     GET takes pagination number
    getCompanyJobs: `${server}api/company/jobs/`, //needs companyId GET
    getJobApplicants: `${server}api/company/job-applicants/`, //needs jobId GET
    deleteJob: `${server}api/job/`, //needs jobId  DELETE
    editJob: `${server}api/job/`, //needs jobId    PUT
    getJob: `${server}api/job/`, //needs jobId     GET
  },
  quiz: {
    addQuestion: `${server}api/job/add-question/`, //jobId POST
    editQuestion: `${server}api/job/edit-question/`, //jobId/questionId PUT
    removeQuestion: `${server}api/job/remove-question/`, //jobId DELETE {data:{questionId}}
  },
  applicant: {
    editStatus: `${server}api/company/job-applicants/`, //jobId/applicantId PUT
    applyForJob: `${server}api/company/apply-job/`, //jobId POST
    cancelJobApplication: `${server}api/company/cancel-job/`, //jobId DELETE
    getApplicants: `${server}api/company/job-applicants/`, //jobId GET
    getAppliedJobs: `${server}api/applicant/my-jobs`, // GET
  },
  blog: {
    //error can be caught through data.error
    uploadPost: `${server}api/post`, //post request
    editPost: `${server}api/post/`, //:id put request
    deletePost: `${server}api/post/`, //:id delete request
    fetchPosts: `${server}api/post`, //get request
    loadMorePosts: `${server}api/post/more/`, //:skipCount get request
  },
  event: {
    //error can be caught through data.error
    uploadPost: `${server}api/event`, // post request
    editPost: `${server}api/event/`, // :id put request
    deletePost: `${server}api/event/`, // :id delete request
    fetchPosts: `${server}api/event`, // get request
    loadMorePosts: `${server}api/event/more/`, //:skipCount get request
    setGoing: `${server}api/event/going`,
  },

  chat: {
    getConversation: `${server}api/chat/`, // get :userId
    fetchConversations: `${server}api/chat`, // get all conversations
    createConversation: `${server}api/chat/`, // post request  :remoteUserProfileID
  },
  admin: {
    subscribeToPlan: `${server}api/company/subscribe` /* "data":{
      "type":"plat",
      "companyProfileId":"5fb445e3c6b2ac3fb40f2267"
    } */,
    login: `${server}api/admin`,
    getAnalysis: `${server}api/admin/analysis`,
    getWebsiteAnalysis: `${server}api/admin/website-analysis`,
    getCompanies: `${server}api/company`, //get request "/:pageNumber?searchBy=name|plan & searchText='some text'
    websiteMode: `${server}api/admin/website-mode`,
  },

  company: {
    openContact: `${server}api/company/open-contact`, //post request ,takes data:{id:"userId"}
    checkContact: `${server}api/company/opened/`, //get request takes userId as param, returns 200  or 404,
  },
  interview: {
    generate: `${server}api/company/interview-code/generate`,
    validate: `${server}api/company/interview-code/validate`,
  },
  notification: {
    getUnread: `${server}api/user/notifications/0`,
    markAsRead: `${server}api/user/notifications`,
    create: `${server}api/admin/notification`,
  },
};
