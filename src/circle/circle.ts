import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { CircleName, Owner } from "./circle.vo";
import { User } from "../user/user";

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

    add(member: User): void {
        this.members.push(member);
    }
}
