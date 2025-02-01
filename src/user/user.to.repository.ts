import { DataSource, EntityManager, Repository } from "typeorm";
import { User } from "./user";
import { UserRepository } from "./user.repository";
import { UserId, UserName } from "./user.vo";
import { inject, singleton } from "tsyringe";
import { AppDataSource } from "../common/datasource";

@singleton()
export class UserTORepository implements UserRepository {
    private repository: Repository<User>;

    constructor(@inject(AppDataSource) private datasource: DataSource) {
        this.repository = this.datasource.getRepository(User);
    }

    get manager(): EntityManager {
        return this.repository.manager;
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async findAll(userName?: UserName): Promise<User[]> {
        return this.repository.find({ where: { userName } });
    }

    async findById(userId: UserId): Promise<User | null> {
        return this.repository.findOne({ where: { userId } });
    }

    async findByIdWithLock(manager: EntityManager, userId: UserId): Promise<User | null> {
        return manager.findOne(User, {
            where: { userId },
            transaction: true,
            lock: { mode: "pessimistic_write" },
        });
    }

    async delete(user: User): Promise<User> {
        return this.repository.softRemove(user);
    }
}
