import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => User, (user) => user.circles)
    @JoinTable({
        name: "tb_circle_member",
        joinColumn: { name: "circle_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "userId" },
    })
    members: User[];

    countMember(): number {
        return this.members.length + 1;
    }

    join(user: User): void {
        this.members.push(user);
    }
}
