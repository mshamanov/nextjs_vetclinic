class VisitDTO {
    /**
     * Creates a visit record for a pet
     *
     * @param id {string}
     * @param date {Date}
     * @param description {string}
     */
    constructor(id, date = new Date(), description) {
        if (id) {
            this.id = id;
        }
        this.date = date;
        this.description = description;
    }
}

export default VisitDTO;