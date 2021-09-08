import { ObjectId } from "mongodb";
import AddVisit from "../../../../../../../src/components/visits/AddVisit";
import { withMongo } from "../../../../../../../src/utils/mongodb-utils";
import Custom404 from "../../../../../../404";

const AddVisitPage = ({owner, pet}) => {
    if (!owner || !pet) {
        return <Custom404 />
    }

    return <AddVisit owner={owner} pet={pet} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;
    const petId = context.params.petId;

    let owner = null;
    let pet = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("owners");
            const result = await collection.findOne({_id: new ObjectId(ownerId)}, {projection: {"pets.visits": 0}});
            owner = mongo.normalizeId(result);
        });

        if (owner) {
            pet = owner.pets.find(pet => pet.id === petId);
        }
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            owner,
            pet
        }
    }
}

export default AddVisitPage;