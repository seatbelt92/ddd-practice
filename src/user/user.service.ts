import { inject, singleton } from "tsyringe";
import { User } from "./user";
import { UserRepository } from "./user.repository";
import { UserTORepository } from "./user.to.repository";

@singleton()
export class UserService {
    constructor(@inject(UserTORepository) private userRepository: UserRepository) {}

    async exists(user: User): Promise<boolean> {
        const { userName } = user;
        const users = await this.userRepository.findAll(userName);
        return users.length > 0 ? true : false;
    }
}
