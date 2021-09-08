import { ObjectId } from "mongodb";
import EditVet from "../../../../src/components/vets/EditVet";
import { withMongo } from "../../../../src/utils/mongodb-utils";
import Custom404 from "../../../404";

const EditVetPage = ({vet}) => {
    if (!vet) {
        return <Custom404 />
    }

    return <EditVet vet={vet} />
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


export default EditVetPage;