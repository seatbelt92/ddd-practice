import { MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

export class UserName {
    @Column({ type: "varchar", name: "name" })
    @MinLength(2)
    @MaxLength(10)
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}
