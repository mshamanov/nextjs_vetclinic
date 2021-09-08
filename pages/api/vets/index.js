import { ObjectId } from "mongodb";
import { withMongo } from "../../../src/utils/mongodb-utils";

async function handler(req, res) {
    const vetData = req.body;

    try {
        if (req.method === "POST") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("vets");
                const result = await collection.insertOne(vetData);
                res.status(201).json({
                    message: "Vet inserted",
                    result
                });
            });
        }

        if (req.method === "PUT") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("vets");
                const {id, ...updatedVet} = vetData;
                const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: updatedVet});
                res.status(200).json({
                    message: "Vet updated",
                    result
                });
            });
        }

        if (req.method === "DELETE") {
            const {id} = req.query;

            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("vets");
                const result = await collection.deleteOne({_id: new ObjectId(id)});
                res.status(200).json({
                    message: "Vet deleted",
                    result
                });
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errorMessage: e.message,
        });
    }
}

export default handler;