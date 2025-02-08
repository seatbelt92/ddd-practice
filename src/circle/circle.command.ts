export class CircleCreateCommand {
    constructor(
        public userId: string,
        public name: string,
    ) {}
}

export class CircleJoinCommand {
    constructor(
        public id: number,
        public userId: string,
    ) {}
}
