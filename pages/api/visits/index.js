import { ObjectId } from "mongodb";
import { withMongo } from "../../../src/utils/mongodb-utils";

async function handler(req, res) {
    const visitData = req.body;
    const {ownerId, petId} = req.query;

    try {
        if (req.method === "POST") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const result = await collection.updateOne(
                    {_id: new ObjectId(ownerId), "pets._id": new ObjectId(petId)},
                    {$push: {"pets.$.visits": {$each: [{_id: new ObjectId(), ...visitData}], $sort: {date: 1}}}});
                res.status(201).json({
                    message: "Visit inserted",
                    result
                });
            });
        }

        if (req.method === "PUT") {
            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const {id, ...updatedVisit} = visitData;
                const setData = Object.keys(updatedVisit).reduce((acc, key) => {
                    acc[`pets.$[pet].visits.$[visit].${key}`] = updatedVisit[key];
                    return acc;
                }, {});

                const result = await collection.updateOne(
                    {_id: new ObjectId(ownerId)},
                    {$set: setData},
                    {
                        arrayFilters: [{"pet._id": new ObjectId(petId)}, {"visit._id": new ObjectId(id)}]
                    });
                await collection.updateOne(
                    {_id: new ObjectId(ownerId)},
                    {$push: {"pets.$[pet].visits": {$each: [], $sort: {date: 1}}}},
                    {
                        arrayFilters: [{"pet._id": new ObjectId(petId)}]
                    });
                res.status(200).json({
                    message: "Visit updated",
                    result
                });
            });
        }

        if (req.method === "DELETE") {
            const {id} = req.query;

            await withMongo(async (mongo) => {
                const collection = mongo.db.collection("owners");
                const result = await collection.updateOne(
                    {_id: new ObjectId(ownerId), "pets._id": new ObjectId(petId)},
                    {$pull: {"pets.$.visits": {_id: new ObjectId(id)}}});
                res.status(200).json({
                    message: "Visit deleted",
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