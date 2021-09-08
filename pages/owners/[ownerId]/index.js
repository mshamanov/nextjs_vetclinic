import { ObjectId } from "mongodb";
import ViewOwner from "../../../src/components/owners/ViewOwner";
import { withMongo } from "../../../src/utils/mongodb-utils";
import Custom404 from "../../404";

const ViewOwnerPage = ({owner}) => {
    if (!owner) {
        return <Custom404 />
    }

    return <ViewOwner owner={owner} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;

    let owner = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("owners");
            const result = await collection.findOne({_id: new ObjectId(ownerId)});
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

export default ViewOwnerPage;