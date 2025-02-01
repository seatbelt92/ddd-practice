import { inject, singleton } from "tsyringe";
import { CircleTORepository } from "./circle.to.repository";
import { CircleRepository } from "./circle.repository";
import { CircleService } from "./circle.service";
import { CircleCreateCommand, CircleJoinCommand } from "./circle.command";
import { UserId } from "../user/user.vo";
import { UserTORepository } from "../user/user.to.repository";
import { AlreadyExistError, ResourceNotFoundError } from "../common/base.error";
import { CircleName, Owner } from "./circle.vo";
import { Circle } from "./circle";
import { CircleFactory } from "./circle.factory";
import { UserRepository } from "../user/user.repository";
import { DefaultCircleFactory } from "./default.circle.factory";

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
        const ownerId = new UserId(userId);

        const owner = await this.userRepository.findById(ownerId);
        if (!owner) throw new ResourceNotFoundError();

        const circleName = new CircleName(name);
        const circle = this.circleFactory.create(circleName, new Owner(ownerId));

        if (await this.circleService.exists(circle)) throw new AlreadyExistError();

        return this.circleRepository.save(circle);
    }

    async joinCircle(command: CircleJoinCommand): Promise<Circle> {
        const { userId, id } = command;
        const memberId = new UserId(userId);

        const member = await this.userRepository.findById(memberId);
        if (!member) throw new ResourceNotFoundError();

        const circle = await this.circleRepository.findById(id);
        if (!circle) throw new ResourceNotFoundError();

        if (circle.members.length >= 29)
            throw Error("서클 가입자는 서클장을 포함해서 30명 이하여야 합니다.");
        circle.add(member);

        return this.circleRepository.save(circle);
    }
}
