import { ObjectId } from "mongodb";
import { withMongo } from "../../../src/utils/mongodb-utils";

async function handler(req, res) {
    const petData = req.body;
    const {ownerId} = req.query;

    try {
        if (req.method === "POST") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const result = await collection.updateOne(
                    {_id: new ObjectId(ownerId)},
                    {$push: {pets: {_id: new ObjectId(), ...petData}}});
                res.status(201).json({
                    message: "Pet inserted",
                    result
                });
            });
        }

        if (req.method === "PUT") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const {id, visits, ...updatedPet} = petData;
                const setData = Object.keys(updatedPet).reduce((acc, key) => {
                    acc[`pets.$.${key}`] = updatedPet[key];
                    return acc;
                }, {});

                const result = await collection.updateOne(
                    {_id: new ObjectId(ownerId), "pets._id": new ObjectId(id)},
                    {$set: setData});
                res.status(200).json({
                    message: "Pet updated",
                    result
                });
            });
        }

        if (req.method === "DELETE") {
            const {id} = req.query;

            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const result = await collection.updateOne({_id: new ObjectId(ownerId)}, {$pull: {pets: {_id: new ObjectId(id)}}});
                res.status(200).json({
                    message: "Pet deleted",
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