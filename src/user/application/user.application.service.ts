import { inject, singleton } from "tsyringe";
import { AlreadyExistError, ResourceNotFoundError } from "../../common/base.error";
import { User } from "../user";
import { UserRegisterCommand, UserUpdateCommand } from "../user.command";
import { UserDataModel } from "../user.dto";
import { UserRepository } from "../user.repository";
import { UserService } from "../user.service";
import { UserId, UserName } from "../user.vo";
import { UserTORepository } from "../user.to.repository";

@singleton()
export class UserApplicationService {
    constructor(
        @inject(UserService) private userService: UserService,
        @inject(UserTORepository) private userRepository: UserRepository,
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
}
