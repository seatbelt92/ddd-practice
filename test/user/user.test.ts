import { User } from "../../src/user/user";
import { UserName } from "../../src/user/user.vo";

describe("Test - User entity", () => {
    test("create a User", () => {
        const userName = new UserName("testUser");
        const user = new User(userName);

        expect(user.userName.value).toBe("testUser");
        expect(user.userId).toBeDefined();
    });

    test("change the username", () => {
        const userName = new UserName("testUser");
        const updatedUserName = new UserName("updated");
        const user = new User(userName);

        user.changeUserName(updatedUserName);

        expect(user.userName.value).toBe("updated");
    });

    test("throw an error when trying change username to null or undefined", () => {
        const userName = new UserName("testUser");
        const user = new User(userName);

        expect(() => user.changeUserName(null as unknown as UserName)).toThrow(
            "사용자명은 필수입니다.",
        );
        expect(() => user.changeUserName(undefined as unknown as UserName)).toThrow(
            "사용자명은 필수입니다.",
        );
    });

    test("throw an error when the length of username is not between 2 and 10", () => {
        const underTwoName = "1";
        const overTenName = "lengthIsOver10";

        expect(() => new UserName(underTwoName)).toThrow(
            "사용자명은 2글자 이상, 10글자 이하여야 합니다.",
        );
        expect(() => new UserName(overTenName)).toThrow(
            "사용자명은 2글자 이상, 10글자 이하여야 합니다.",
        );
    });
});
