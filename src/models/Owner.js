import Person from "./Person";

class Owner extends Person {
    /**
     * Creates a pet owner
     *
     * @param firstName {string}
     * @param lastName {string}
     * @param address {string}
     * @param phone {string}
     * @param email {string}
     * @param pets? {Pet[]}
     */
    constructor(firstName, lastName, address, phone, email, ...pets) {
        super(firstName, lastName, address, phone, email);
        this.pets = pets;
        this.pets.forEach(pet => pet.owner = this);
    }

    /**
     * Creates a shallow copy of this owner
     *
     * @returns {Owner}
     */
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    toString() {
        return `${this.firstName} ${this.lastName}`;
    }
}

export default Owner;