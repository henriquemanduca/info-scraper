export default class PageMapper {
    constructor(
        public page?: number,
        public limit?: number,
        public orderBy?: string,
        public sortBy?: string,
    ) { }
}
