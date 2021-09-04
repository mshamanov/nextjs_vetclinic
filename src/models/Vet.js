import Person from "./Person";

class Vet extends Person {
    /**
     * Creates a veterinarian
     *
     * @param firstName {string}
     * @param lastName {string}
     * @param address {string}
     * @param phone {string}
     * @param email {string}
     * @param specialities? {...string}
     */
    constructor(firstName, lastName, address, phone, email, ...specialities) {
        super(firstName, lastName, address, phone, email);
        this.specialities = [...new Set(specialities)];
    }

    /**
     * Creates a shallow copy of this veterinarian
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

export default Vet;