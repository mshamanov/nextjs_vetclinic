import { generateId } from "../utils/common-utils";

class Person {
    /**
     * Creates a person
     *
     * @param firstName {string}
     * @param lastName {string}
     * @param address {string}
     * @param phone {string}
     * @param email {string}
     */
    constructor(firstName, lastName, address, phone, email) {
        this.id = generateId(this.constructor.name.toLowerCase());
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}

export default Person;