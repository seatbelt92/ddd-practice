import { singleton } from "tsyringe";
import { Circle } from "./circle";
import { CircleFactory } from "./circle.factory";
import { CircleName, Owner } from "./circle.vo";

@singleton()
export class DefaultCircleFactory implements CircleFactory {
    create(name: CircleName, owner: Owner): Circle {
        return new Circle(name, owner);
    }
}
