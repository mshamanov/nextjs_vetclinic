import PersonDTO from "./PersonDTO";

class VetDTO extends PersonDTO {
    /**
     * Creates a veterinarian
     *
     * @param id {string}
     * @param firstName {string}
     * @param lastName {string}
     * @param address {string}
     * @param phone {string}
     * @param email {string}
     * @param specialities? {...string}
     */
    constructor(id, firstName, lastName, address, phone, email, ...specialities) {
        super(id, firstName, lastName, address, phone, email);
        this.specialities = [...new Set(specialities)];
    }
}

export default VetDTO;