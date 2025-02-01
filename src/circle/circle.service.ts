import { inject, singleton } from "tsyringe";
import { CircleTORepository } from "./circle.to.repository";
import { CircleRepository } from "./circle.repository";
import { Circle } from "./circle";
import { EntityManager } from "typeorm";

@singleton()
export class CircleService {
    constructor(@inject(CircleTORepository) private circleRepository: CircleRepository) {}

    async exists(manager: EntityManager, circle: Circle): Promise<boolean> {
        const { name } = circle;
        const duplicated = await this.circleRepository.findByNameWithLock(manager, name);
        return duplicated !== null ? true : false;
    }
}
