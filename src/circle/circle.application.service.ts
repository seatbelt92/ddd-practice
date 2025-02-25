import { inject, singleton } from "tsyringe";
import { CircleTORepository } from "./circle.to.repository";
import { CircleRepository } from "./circle.repository";
import { CircleService } from "./circle.service";
import { CircleCreateCommand, CircleJoinCommand } from "./circle.command";
import { UserTORepository } from "../user/user.to.repository";
import { AlreadyExistError, ResourceNotFoundError } from "../common/base.error";
import { CircleName, Owner } from "./circle.vo";
import { Circle } from "./circle";
import { CircleFactory } from "./circle.factory";
import { UserRepository } from "../user/user.repository";
import { DefaultCircleFactory } from "./default.circle.factory";
import { CircleFullSpecification } from "./circle.specification";
import { CircleCapacityExceededError } from "./circle.error";

@singleton()
export class CircleApplicationService {
    constructor(
        @inject(DefaultCircleFactory) private circleFactory: CircleFactory,
        @inject(CircleTORepository) private circleRepository: CircleRepository,
        @inject(UserTORepository) private userRepository: UserRepository,
        @inject(CircleService) private circleService: CircleService,
    ) {}

    async createCircle(command: CircleCreateCommand): Promise<Circle> {
        const { userId, name } = command;
        const ownerId = userId;

        const circleName = new CircleName(name);
        const circle = this.circleFactory.create(circleName, new Owner(ownerId));

        return this.circleRepository.manager.transaction(async (manager) => {
            const owner = await this.userRepository.findByIdWithLock(manager, ownerId);
            if (!owner) throw new ResourceNotFoundError();

            if (await this.circleService.exists(manager, circle)) throw new AlreadyExistError();

            return manager.save(circle);
        });
    }

    async joinCircle(command: CircleJoinCommand): Promise<Circle> {
        const { userId, id } = command;
        const memberId = userId;

        const circleFullSpec = new CircleFullSpecification();

        return this.circleRepository.manager.transaction(async (manager) => {
            const member = await this.userRepository.findByIdWithLock(manager, memberId);
            if (!member) throw new ResourceNotFoundError();

            const circle = await this.circleRepository.findByIdWithLock(manager, id);
            if (!circle) throw new ResourceNotFoundError();
            if (circleFullSpec.isSatisfiedBy(circle)) throw new CircleCapacityExceededError();

            circle.join(member);
            return manager.save(circle);
        });
    }
}
