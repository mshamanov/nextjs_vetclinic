import PersonDTO from "./PersonDTO";

class OwnerDTO extends PersonDTO {
    /**
     * Creates a pet owner
     *
     * @param id {string}
     * @param firstName {string}
     * @param lastName {string}
     * @param address {string}
     * @param phone {string}
     * @param email {string}
     * @param pets {any[]}
     */
    constructor(id, firstName, lastName, address, phone, email, pets= []) {
        super(id, firstName, lastName, address, phone, email);
        this.pets = pets;
    }
}

export default OwnerDTO;