import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Post_Comments } from "../entities/post_comments.entity";

export const authCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postCommentsRepository = AppDataSource.getRepository(Post_Comments);

    const { id: commentId } = req.params;

    const postComments = await postCommentsRepository.find();

    const selectedComment = postComments.find(
      (comment) => comment.id === commentId
    );

    if (selectedComment?.user_id !== req.userId) {
      throw new Error();
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "You are not allowed to do that on this comment",
    });
  }
};