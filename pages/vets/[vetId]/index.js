import { ObjectId } from "mongodb";
import ViewVeterinarian from "../../../src/components/veterinarians/ViewVeterinarian";
import { withMongo } from "../../../src/utils/mongodb-utils";
import Custom404 from "../../404";

const ViewVetPage = ({vet}) => {
    if (!vet) {
        return <Custom404 />
    }

    return <ViewVeterinarian vet={vet} />
}

export async function getServerSideProps(context) {
    const vetId = context.params.vetId;

    let vet = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("vets");
            const result = await collection.findOne({_id: new ObjectId(vetId)});
            vet = mongo.normalizeId(result);
        });
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            vet
        }
    }
}

export default ViewVetPage;