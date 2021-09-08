import { MongoClient } from "mongodb";

export class Mongo {
    constructor() {
        this.client = new MongoClient(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db();
    }

    async close() {
        if (this.client) {
            await this.client.close();
        }
    }

    normalizeId(obj) {
        if (typeof obj !== "object") {
            return obj;
        }

        const result = {};
        for (let key in obj) {
            let value = obj[key];
            if (key === "_id") {
                key = "id";
                value = value.toString();
            }
            if (Array.isArray(value)) {
                value = value.map(val => this.normalizeId(val));
            }
            result[key] = value;
        }

        return result;
    }
}

export async function withMongo(callback) {
    const mongo = new Mongo();
    try {
        await mongo.connect();
        return await callback(mongo);
    } finally {
        await mongo.close()
    }
}