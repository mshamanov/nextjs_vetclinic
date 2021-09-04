import { generateId } from "../utils/common-utils";

class Pet {
    /**
     * Creates a pet
     *
     * @param name {string}
     * @param birthDate {Date}
     * @param type {string}
     * @param owner? {Owner}
     * @param visits? {Visit}
     */
    constructor(name, birthDate = new Date(), type, owner = null, ...visits) {
        this.id = generateId(this.constructor.name.toLowerCase());
        this.name = name;
        this.birthDate = birthDate;
        this.type = type;
        this.owner = owner;
        this.visits = visits;
        this.visits.forEach(visit => visit.pet = this);
    }

    get birthDateAsString() {
        return this.birthDate.toLocaleDateString(["en-US"], {day: "2-digit", month: "short", year: "numeric"});
    }

    /**
     * Creates a shallow copy of this pet
     *
     * @returns {Pet}
     */
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    toString() {
        return `${this.type} ${this.name}`;
    }
}

export default Pet;