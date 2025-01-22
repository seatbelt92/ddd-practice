import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserId, UserName } from "./user.vo";
import { v4 as uuidv4 } from "uuid";
import { BaseEntity } from "../common/base.entity";

@Entity("tb_user")
export class User extends BaseEntity {
    constructor(userName: UserName) {
        super();
        this.userId = new UserId(uuidv4());
        this.userName = userName;
    }

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({
        type: "varchar",
        transformer: {
            to: (value: UserId) => value.value,
            from: (value: string) => new UserId(value),
        },
    })
    userId: UserId;

    @Column({
        type: "varchar",
        transformer: {
            to: (value: UserName) => value.value,
            from: (value: string) => new UserName(value),
        },
    })
    userName: UserName;

    changeUserName(userName: UserName): void {
        if (!userName) {
            throw new Error("사용자명은 필수입니다.");
        }
        this.userName = userName;
    }
}
