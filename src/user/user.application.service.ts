import { AlreadyExistError, ResourceNotFoundError } from "../common/base.error";
import { User } from "./user";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserId, UserName } from "./user.vo";

export class UserApplicationService {
    constructor(
        private userService: UserService,
        private userRepository: UserRepository,
    ) {}

    async registerUser(name: string): Promise<User> {
        const user = new User(new UserName(name));
        const userNameExists = await this.userService.exists(user);
        if (userNameExists) {
            throw new AlreadyExistError();
        }
        return this.userRepository.save(user);
    }

    async updateUser(id: string, name: string): Promise<User> {
        const user = await this.userRepository.findById(new UserId(id));
        if (!user) throw new ResourceNotFoundError();

        const userName = new UserName(name);
        user.changeUserName(userName);

        const userNameExists = await this.userService.exists(user);
        if (userNameExists) {
            throw new AlreadyExistError();
        }

        return this.userRepository.save(user);
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userRepository.findById(new UserId(id));
        if (!user) throw new ResourceNotFoundError();

        return user;
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userRepository.findById(new UserId(id));
        if (!user) throw new ResourceNotFoundError();

        return this.userRepository.delete(user);
    }
}
