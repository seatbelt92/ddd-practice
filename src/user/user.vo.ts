import { IsNotEmpty, Max, Min } from "class-validator";
import { Column } from "typeorm";

export class UserName {
    @Column({ type: "varchar", name: "name" })
    @IsNotEmpty()
    @Min(2)
    @Max(10)
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}
