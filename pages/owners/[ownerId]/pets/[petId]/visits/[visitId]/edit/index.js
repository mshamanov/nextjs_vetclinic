import { ObjectId } from "mongodb";
import EditVisit from "../../../../../../../../src/components/visits/EditVisit";
import { withMongo } from "../../../../../../../../src/utils/mongodb-utils";
import Custom404 from "../../../../../../../404";

const EditVisitPage = ({owner, pet, visit}) => {
    if (!owner || !pet || !visit) {
        return <Custom404 />
    }

    return <EditVisit owner={owner} pet={pet} visit={visit} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;
    const petId = context.params.petId;
    const visitId = context.params.visitId;

    let owner = null;
    let pet = null;
    let visit = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("owners");
            const result = await collection.aggregate([
                {"$match": {"_id": new ObjectId(ownerId)}},
                {
                    "$addFields": {
                        "pets": {
                            "$filter": {
                                "input": {
                                    "$map": {
                                        "input": "$pets",
                                        "as": "sa",
                                        "in": {
                                            "$mergeObjects": [
                                                "$$sa",
                                                {
                                                    "visits": {
                                                        "$filter": {
                                                            "input": "$$sa.visits",
                                                            "as": "sn",
                                                            "cond": {
                                                                "$eq": ["$$sn._id", new ObjectId(visitId)]
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                },
                                "as": "sa",
                                "cond": {
                                    "$eq": ["$$sa._id", new ObjectId(petId)]
                                }
                            }
                        }
                    }
                }]).toArray();

            owner = mongo.normalizeId(result[0]);
            if (owner) {
                pet = owner.pets.find(pet => pet.id === petId);
                if (pet) {
                    visit = pet.visits[0];
                }
            }
        });
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            owner,
            pet,
            visit
        }
    }
}

export default EditVisitPage;