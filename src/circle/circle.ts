import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { CircleName, Owner } from "./circle.vo";
import { User } from "../user/user";
import { CircleCapacityExceededError } from "./circle.error";

@Entity("tb_circle")
export class Circle extends BaseEntity {
    constructor(name: CircleName, owner: Owner) {
        super();
        this.name = name;
        this.owner = owner;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        transformer: {
            to: (value: CircleName) => value.value,
            from: (value: string) => new CircleName(value),
        },
    })
    name: CircleName;

    @Column(() => Owner)
    owner: Owner;

    @Column({ type: "json" })
    members: User[];

    isFull(): boolean {
        return this.members.length >= 29;
    }

    join(user: User): void {
        if (this.isFull()) throw new CircleCapacityExceededError();
        this.members.push(user);
    }
}
