import { User } from "./user";
import { UserId, UserName } from "./user.vo";

export class UserDataModel {
    constructor(user: User) {
        this.userId = user.userId;
        this.userName = user.userName;
        this.createdAt = user.createdAt;
    }

    userId: UserId;
    userName: UserName;
    createdAt: Date;
}
