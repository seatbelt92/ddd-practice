import { User } from "./user";
import { UserId, UserName } from "./user.vo";

export interface UserRepository {
    findById(userId: UserId): Promise<User | null>;
    findAll(userName?: UserName): Promise<User[]>;
    save(user: User): Promise<User>;
    delete(user: User): Promise<User>;
}
