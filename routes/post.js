const Router=require("express").Router()
const {uploadPost,editPost,deletePost,getMorePosts,getPosts}=require("../controller/Post/Post")
const passport=require("../services/jwtPassport")

Router.post("/",uploadPost)
Router.put("/:id",editPost)
Router.delete("/:id",deletePost)
Router.get("/",getPosts)
Router.get("/more/:skip/",getMorePosts)

module.exports=Router;