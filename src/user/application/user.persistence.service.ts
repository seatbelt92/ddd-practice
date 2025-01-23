import { ResourceNotFoundError } from "../../common/base.error";
import { UserDeleteCommand, UserGetCommand } from "../user.command";
import { UserDataModel } from "../user.dto";
import { UserRepository } from "../user.repository";
import { UserId } from "../user.vo";

export class UserPersistenceService {
    constructor(private userRepository: UserRepository) {}

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
