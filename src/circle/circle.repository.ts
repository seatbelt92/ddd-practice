import { EntityManager } from "typeorm";
import { Circle } from "./circle";
import { CircleName } from "./circle.vo";

export interface CircleRepository {
    get manager(): EntityManager;
    save(circle: Circle): Promise<Circle>;
    findById(id: number): Promise<Circle | null>;
    findByName(name: CircleName): Promise<Circle | null>;
    findByIdWithLock(manager: EntityManager, id: number): Promise<Circle | null>;
    findByNameWithLock(manager: EntityManager, name: CircleName): Promise<Circle | null>;
}
