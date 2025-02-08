import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserName } from "./user.vo";
import { v4 as uuidv4 } from "uuid";
import { BaseEntity } from "../common/base.entity";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Circle } from "../circle/circle";

@Entity("tb_user")
export class User extends BaseEntity {
    constructor(userName: UserName) {
        super();
        this.userId = uuidv4();
        this.userName = userName;
    }

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({ type: "varchar" })
    @IsNotEmpty()
    userId: string;

    @Column(() => UserName, { prefix: "user" })
    @Type(() => UserName)
    @ValidateNested()
    userName: UserName;

    @Column({ type: "boolean" })
    isPremium = false;

    @ManyToMany(() => Circle, (circle) => circle.members)
    readonly circles: Circle[];

    changeUserName(userName: UserName): void {
        if (!userName) {
            throw new Error("사용자명은 필수입니다.");
        }
        this.userName = userName;
    }
}
