import { ObjectId } from "mongodb";
import AddPet from "../../../../../src/components/pets/AddPet";
import { withMongo } from "../../../../../src/utils/mongodb-utils";
import Custom404 from "../../../../404";

const AddPetPage = ({owner}) => {
    if (!owner) {
        return <Custom404 />
    }

    return <AddPet owner={owner} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;

    let owner = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("owners");
            const result = await collection.findOne({_id: new ObjectId(ownerId)}, {projection: {pets: 0}});
            console.log(result);
            owner = mongo.normalizeId(result);
        });
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            owner
        }
    }
}

export default AddPetPage;