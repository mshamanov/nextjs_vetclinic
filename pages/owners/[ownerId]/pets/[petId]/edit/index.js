import { ObjectId } from "mongodb";
import EditPet from "../../../../../../src/components/pets/EditPet";
import { withMongo } from "../../../../../../src/utils/mongodb-utils";
import Custom404 from "../../../../../404";

const EditPetPage = ({owner, pet}) => {
    if (!owner || !pet) {
        return <Custom404 />
    }

    return <EditPet owner={owner} pet={pet} />
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

export default EditPetPage;