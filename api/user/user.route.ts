import { Router } from "express";
import { constants } from "http2";
import { UserTORepository } from "../../src/user/user.to.repository";
import { UserService } from "../../src/user/user.service";
import { UserApplicationService } from "../../src/user/user.application.service";
import { AppDataSource } from "../../src/common/datasource";

const userRoutes = Router();
const datasource = new AppDataSource();
datasource.initialize();
const userRepository = new UserTORepository(datasource);
const userService = new UserService(userRepository);
const userAppService = new UserApplicationService(userService, userRepository);

userRoutes.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const user = await userAppService.registerUser(name);
        res.status(constants.HTTP_STATUS_CREATED).json(user);
    } catch (err) {
        next(err);
    }
});

userRoutes.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userAppService.getUser(id);
        res.status(constants.HTTP_STATUS_OK).json(user);
    } catch (err) {
        next(err);
    }
});

userRoutes.get("/", async (req, res, next) => {
    try {
        const users = await userAppService.getUsers();
        res.status(constants.HTTP_STATUS_OK).json(users);
    } catch (err) {
        next(err);
    }
});

userRoutes.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const user = await userAppService.updateUser(id, name);
        res.status(constants.HTTP_STATUS_OK).json(user);
    } catch (err) {
        next(err);
    }
});

userRoutes.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userAppService.deleteUser(id);
        res.status(constants.HTTP_STATUS_OK).json(user);
    } catch (err) {
        next(err);
    }
});

export default userRoutes;
