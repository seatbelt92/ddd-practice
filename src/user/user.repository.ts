import { EntityManager } from "typeorm";
import { User } from "./user";
import { UserName } from "./user.vo";

export interface UserRepository {
    get manager(): EntityManager;
    save(user: User): Promise<User>;
    findAll(userName?: UserName): Promise<User[]>;
    findById(userId: string): Promise<User | null>;
    findByIdWithLock(manager: EntityManager, userId: string): Promise<User | null>;
    delete(user: User): Promise<User>;
}
