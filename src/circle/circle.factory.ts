import { Circle } from "./circle";
import { CircleName, Owner } from "./circle.vo";

export interface CircleFactory {
    create(name: CircleName, owner: Owner): Circle;
}
