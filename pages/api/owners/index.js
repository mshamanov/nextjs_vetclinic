import { ObjectId } from "mongodb";
import { withMongo } from "../../../src/utils/mongodb-utils";

async function handler(req, res) {
    const ownerData = req.body;

    try {
        if (req.method === "POST") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const result = await collection.insertOne(ownerData);
                res.status(201).json({
                    message: "Owner inserted",
                    result
                });
            });
        }

        if (req.method === "PUT") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const {id, pets, ...updatedOwner} = ownerData;
                const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: updatedOwner});
                res.status(200).json({
                    message: "Owner updated",
                    result
                });
            });
        }

        if (req.method === "DELETE") {
            const {id} = req.query;

            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const result = await collection.deleteOne({_id: new ObjectId(id)});
                res.status(200).json({
                    message: "Owner deleted",
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