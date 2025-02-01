import { inject, singleton } from "tsyringe";
import { CircleTORepository } from "./circle.to.repository";
import { CircleRepository } from "./circle.repository";
import { Circle } from "./circle";

@singleton()
export class CircleService {
    constructor(@inject(CircleTORepository) private circleRepository: CircleRepository) {}

    async exists(circle: Circle): Promise<boolean> {
        const { name } = circle;
        const duplicated = await this.circleRepository.findByName(name);
        return duplicated !== null ? true : false;
    }
}
