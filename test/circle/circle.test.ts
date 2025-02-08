import { Circle } from "../../src/circle/circle";
import { CircleName, Owner } from "../../src/circle/circle.vo";
import { User } from "../../src/user/user";
import { UserName } from "../../src/user/user.vo";

describe("Test - Circle entity", () => {
    let circle1: Circle;
    let user1: User;
    let user2: User;

    beforeEach(async () => {
        circle1 = new Circle(new CircleName("circle1"), new Owner("ownerId1"));
        circle1.id = 1;
        circle1.members = [];
        user1 = new User(new UserName("user1"));
        user1.userId = "userId1";
        user2 = new User(new UserName("user2"));
        user2.userId = "userId2";
    });

    test("create a Circle", () => {
        expect(circle1.name.value).toBe("circle1");
        expect(circle1.owner.id).toBe("ownerId1");
    });

    test("add a user to the circle", () => {
        circle1.join(user1);
        expect(circle1.members).toContain(user1);
    });

    test("count the number of member", () => {
        circle1.join(user1);
        circle1.join(user2);

        expect(circle1.countMember()).toBe(3);
    });
});

describe("Test - CircleName class", () => {
    test("create a CircleName", () => {
        const validName = "validCircle";
        const circleName = new CircleName(validName);

        expect(circleName.value).toBe(validName);
    });

    test("throw an error when CircleName is empty", () => {
        expect(() => new CircleName("")).toThrow("서클명은 필수입니다.");
    });

    test("throw an error when CircleName length is less than 3", () => {
        const lessThan3Name = "A";
        expect(() => new CircleName(lessThan3Name)).toThrow(
            "서클명은 3글자 이상, 20글자 이하여야 합니다.",
        );
    });

    test("throw an error when CircleName length is greater than 20", () => {
        const largerThan20Name = "A".repeat(21);
        expect(() => new CircleName(largerThan20Name)).toThrow(
            "서클명은 3글자 이상, 20글자 이하여야 합니다.",
        );
    });

    test("check equality of two CircleName objects with the same value", () => {
        const circleName1 = new CircleName("circle1");
        const circleName2 = new CircleName("circle1");

        expect(circleName1.equals(circleName2)).toBe(true);
    });

    test("check inequality of two CircleName objects with different values", () => {
        const circleName1 = new CircleName("circle1");
        const circleName2 = new CircleName("circle2");

        expect(circleName1.equals(circleName2)).toBe(false);
    });
});
