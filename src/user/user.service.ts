import { User } from "./user";
import { UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async exists(user: User): Promise<boolean> {
        const { userName } = user;
        const users = await this.userRepository.findAll(userName);
        return users.length > 0 ? true : false;
    }
}
