import { inject, singleton } from "tsyringe";
import { Circle } from "./circle";
import { CircleName } from "./circle.vo";
import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../common/datasource";

@singleton()
export class CircleTORepository {
    private repository: Repository<Circle>;
    constructor(@inject(AppDataSource) private datasource: DataSource) {
        this.repository = this.datasource.getRepository(Circle);
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
}
