import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Project_User } from "../entities/project_user.entity";

export const authProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectUserRepository = AppDataSource.getRepository(Project_User);

    const { id: projectId } = req.params;

    const projectUsers = await projectUserRepository.find();

    const selectedProject = projectUsers.find(
      (projectUser) => projectUser.projects_id === projectId
    );

    if (selectedProject?.users_id !== req.userId) {
      throw new Error();
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "You are not allowed to do that on this project",
    });
  }
};