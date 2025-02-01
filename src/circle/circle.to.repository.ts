import { inject, singleton } from "tsyringe";
import { Circle } from "./circle";
import { CircleName } from "./circle.vo";
import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../common/datasource";

@singleton()
export class CircleTORepository {
    private repository: Repository<Circle>;
    constructor(@inject(AppDataSource) private datasource: DataSource) {
        this.repository = this.datasource.getRepository(Circle);
    }

    get manager(): EntityManager {
        return this.repository.manager;
    }

    async save(circle: Circle): Promise<Circle> {
        return this.repository.save(circle);
    }

    async findById(id: number): Promise<Circle | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByName(name: CircleName): Promise<Circle | null> {
        return this.repository.findOne({ where: { name } });
    }

    async findByIdWithLock(manager: EntityManager, id: number): Promise<Circle | null> {
        return manager.findOne(Circle, {
            where: { id },
            transaction: true,
            lock: { mode: "pessimistic_write" },
        });
    }

    async findByNameWithLock(manager: EntityManager, name: CircleName): Promise<Circle | null> {
        return manager.findOne(Circle, {
            where: { name },
            transaction: true,
            lock: { mode: "pessimistic_write" },
        });
    }
}
