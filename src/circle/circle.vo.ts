import { Column } from "typeorm";
import { UserId } from "../user/user.vo";

export class CircleName {
    constructor(public value: string) {
        if (!value) {
            throw new Error("서클명은 필수입니다.");
        }

        if (value.length < 3 || value.length > 20) {
            throw new Error("서클명은 3글자 이상, 20글자 이하여야 합니다.");
        }
    }

    equals(other: CircleName): boolean {
        return other.value === this.value;
    }
}

export class Owner {
    constructor(id: UserId) {
        this.id = id;
    }
    @Column({
        type: "varchar",
        transformer: {
            to: (value: UserId) => value.value,
            from: (value: string) => new UserId(value),
        },
    })
    id: UserId;
}
