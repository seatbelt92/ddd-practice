import { User } from "./user";
import { UserName } from "./user.vo";

export class UserDataModel {
    constructor(user: User) {
        this.userId = user.userId;
        this.userName = user.userName;
        this.createdAt = user.createdAt;
    }

    userId: string;
    userName: UserName;
    createdAt: Date;
}
