import { Router } from "express";
import { constants } from "http2";
import { UserApplicationService } from "../../src/user/application/user.application.service";
import {
    UserDeleteCommand,
    UserGetCommand,
    UserRegisterCommand,
    UserUpdateCommand,
} from "../../src/user/user.command";
import { UserPersistenceService } from "../../src/user/application/user.persistence.service";
import { container, singleton } from "tsyringe";

@singleton()
export class UserRoute {
    createUserRoute(): Router {
        const userRoutes = Router();
        const userAppService = container.resolve(UserApplicationService);
        const userPerService = container.resolve(UserPersistenceService);

        userRoutes.post("/", async (req, res, next) => {
            try {
                const { name } = req.body;
                const command = new UserRegisterCommand(name);
                const user = await userAppService.registerUser(command);
                res.status(constants.HTTP_STATUS_CREATED).json(user);
            } catch (err) {
                next(err);
            }
        });

        userRoutes.get("/:id", async (req, res, next) => {
            try {
                const { id } = req.params;
                const command = new UserGetCommand(id);
                const user = await userPerService.getUser(command);
                res.status(constants.HTTP_STATUS_OK).json(user);
            } catch (err) {
                next(err);
            }
        });

        userRoutes.get("/", async (req, res, next) => {
            try {
                const users = await userPerService.getUsers();
                res.status(constants.HTTP_STATUS_OK).json(users);
            } catch (err) {
                next(err);
            }
        });

        userRoutes.put("/:id", async (req, res, next) => {
            try {
                const { id } = req.params;
                const { name } = req.body;
                const command = new UserUpdateCommand(id, name, false);
                const user = await userAppService.updateUser(command);
                res.status(constants.HTTP_STATUS_OK).json(user);
            } catch (err) {
                next(err);
            }
        });

        userRoutes.delete("/:id", async (req, res, next) => {
            try {
                const { id } = req.params;
                const command = new UserDeleteCommand(id);
                const user = await userPerService.deleteUser(command);
                res.status(constants.HTTP_STATUS_OK).json(user);
            } catch (err) {
                next(err);
            }
        });

        return userRoutes;
    }
}
