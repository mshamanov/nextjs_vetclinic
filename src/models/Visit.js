import { generateId } from "../utils/common-utils";

class Visit {
    /**
     * Creates a visit record for a pet
     *
     * @param date {Date}
     * @param description {string}
     * @param pet? {Pet}
     */
    constructor(date = new Date(), description = "", pet = null) {
        this.id = generateId(this.constructor.name.toLowerCase());
        this.date = date;
        this.description = description;
        this.pet = pet;
    }

    get dateAsString() {
        return this.date.toLocaleDateString(["en-US"], {day: "2-digit", month: "short", year: "numeric"});
    }

    /**
     * Creates a shallow copy of this visit
     *
     * @returns {Visit}
     */
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}

export default Visit;