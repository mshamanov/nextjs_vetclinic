class PetDTO {
    /**
     * Creates a pet
     *
     * @param id {string}
     * @param name {string}
     * @param birthDate {Date}
     * @param type {string}
     */
    constructor(id, name, birthDate = new Date(), type) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.birthDate = birthDate;
        this.type = type;
        this.visits = [];
    }
}

export default PetDTO;