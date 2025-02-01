import { Circle } from "./circle";
import { CircleName } from "./circle.vo";

export interface CircleRepository {
    save(circle: Circle): Promise<Circle>;
    findById(id: number): Promise<Circle | null>;
    findByName(name: CircleName): Promise<Circle | null>;
}
