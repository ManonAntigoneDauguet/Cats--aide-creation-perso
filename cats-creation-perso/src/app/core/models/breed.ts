export class Breed {

    constructor(
        public id: number,
        public name: string,
        public defaults: Array<string>,
        public qualities: Array<string>
    ) { }
}