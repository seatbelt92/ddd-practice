import { User } from "../../src/user/user";
import { UserName } from "../../src/user/user.vo";
import { validateOrReject, ValidationError } from "class-validator";

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

    test("throw an error when the length of username is not between 2 and 10", async () => {
        const underTwoName = "1";
        const overTenName = "lengthIsOver10";

        try {
            await validateOrReject(new UserName(underTwoName));
        } catch (errors: unknown) {
            const validationErrors = errors as ValidationError[];
            expect(validationErrors[0].constraints?.min).toBe("value must not be less than 2");
        }

        try {
            await validateOrReject(new UserName(overTenName));
        } catch (errors: unknown) {
            const validationErrors = errors as ValidationError[];
            expect(validationErrors[0].constraints?.max).toBe("value must not be greater than 10");
        }
    });
});
