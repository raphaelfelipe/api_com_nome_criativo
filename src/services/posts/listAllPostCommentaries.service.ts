import { AppDataSource } from "../../data-source"
import { Post_Comments } from "../../entities/post_comments.entity"
import { AppError } from "../../errors/appError"

const listAllPostCommentariesService = async(id:string)=>{

    const repository = AppDataSource.getRepository(Post_Comments)

    const posts = await repository.find()

    const postCommentaries = posts.find(post => post.post_id === id)
     
    if(!postCommentaries){
        throw new AppError("Post not found", 404)
    }

   return postCommentaries

}

export default listAllPostCommentariesService