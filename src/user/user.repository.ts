import { EntityManager } from "typeorm";
import { User } from "./user";
import { UserId, UserName } from "./user.vo";

export interface UserRepository {
    get manager(): EntityManager;
    save(user: User): Promise<User>;
    findAll(userName?: UserName): Promise<User[]>;
    findById(userId: UserId): Promise<User | null>;
    findByIdWithLock(manager: EntityManager, userId: UserId): Promise<User | null>;
    delete(user: User): Promise<User>;
}
