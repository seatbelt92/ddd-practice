import { AlreadyExistError, ResourceNotFoundError } from "../common/base.error";
import { User } from "./user";
import {
    UserDeleteCommand,
    UserGetCommand,
    UserRegisterCommand,
    UserUpdateCommand,
} from "./user.command";
import { UserDataModel } from "./user.dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserId, UserName } from "./user.vo";

export class UserApplicationService {
    constructor(
        private userService: UserService,
        private userRepository: UserRepository,
    ) {}

    async registerUser(command: UserRegisterCommand): Promise<UserDataModel> {
        const { name } = command;
        const user = new User(new UserName(name));
        const userNameExists = await this.userService.exists(user);
        if (userNameExists) {
            throw new AlreadyExistError();
        }
        return new UserDataModel(await this.userRepository.save(user));
    }

    async updateUser(command: UserUpdateCommand): Promise<UserDataModel> {
        const { id, name } = command;
        const user = await this.userRepository.findById(new UserId(id));
        if (!user) throw new ResourceNotFoundError();

        const userName = new UserName(name);
        user.changeUserName(userName);

        const userNameExists = await this.userService.exists(user);
        if (userNameExists) {
            throw new AlreadyExistError();
        }

        return new UserDataModel(await this.userRepository.save(user));
    }

    async getUser(command: UserGetCommand): Promise<UserDataModel> {
        const { id } = command;
        const user = await this.userRepository.findById(new UserId(id));
        if (!user) throw new ResourceNotFoundError();

        return new UserDataModel(user);
    }

    async getUsers(): Promise<UserDataModel[]> {
        return this.userRepository
            .findAll()
            .then((users) => users.map((user) => new UserDataModel(user)));
    }

    async deleteUser(command: UserDeleteCommand): Promise<UserDataModel> {
        const { id } = command;
        const user = await this.userRepository.findById(new UserId(id));
        if (!user) throw new ResourceNotFoundError();

        return new UserDataModel(await this.userRepository.delete(user));
    }
}
