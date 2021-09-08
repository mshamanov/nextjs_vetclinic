class PersonDTO {
    /**
     * Creates a person
     *
     * @param id {string}
     * @param firstName {string}
     * @param lastName {string}
     * @param address {string}
     * @param phone {string}
     * @param email {string}
     */
    constructor(id, firstName, lastName, address, phone, email) {
        if (id) {
            this.id = id;
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}

export default PersonDTO;