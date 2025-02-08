import { DataSource } from "typeorm";
import { TestDataSource } from "../test.datasource";
import { Circle } from "../../src/circle/circle";
import { CircleName, Owner } from "../../src/circle/circle.vo";
import { User } from "../../src/user/user";
import { UserName } from "../../src/user/user.vo";

describe("Repository Test - Circle and User Relation", () => {
    let datasource: DataSource;

    beforeAll(async () => {
        datasource = await new TestDataSource().initialize();
        await datasource.query("PRAGMA foreign_keys = OFF;");
    });

    afterAll(async () => {
        if (datasource.isInitialized) {
            await datasource.destroy();
        }
    });

    test("persist and retrieve User from Circle", async () => {
        const circle1 = new Circle(new CircleName("circle1"), new Owner("ownerId1"));
        circle1.id = 1;
        circle1.members = [];
        const user1 = new User(new UserName("user1"));
        user1.userId = "userId1";

        const user = await datasource.manager.save(user1);
        circle1.join(user);
        const circle = await datasource.manager.save(circle1);

        const savedCircle = await datasource.manager.findOne(Circle, {
            where: { id: circle.id },
            relations: ["members"],
        });
        expect(savedCircle?.members).toContainEqual(user);
    });
});
