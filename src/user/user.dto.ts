import { User } from "./user";
import { UserName } from "./user.vo";

export class UserDataModel {
    constructor(user: User) {
        this.userId = user.userId;
        this.userName = user.userName;
        this.isPremium = user.isPremium;
        this.createdAt = user.createdAt;
    }

    userId: string;
    userName: UserName;
    isPremium: boolean;
    createdAt: Date;
}
