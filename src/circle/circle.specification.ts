import { Circle } from "./circle";

export class CircleFullSpecification {
    isSatisfiedBy(circle: Circle): boolean {
        const premiumUserNumber = circle.members.filter((member) => member.isPremium).length;
        const circleUpperLimit = premiumUserNumber < 10 ? 30 : 50;
        return circle.countMember() >= circleUpperLimit;
    }
}
