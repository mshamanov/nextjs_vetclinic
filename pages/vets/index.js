import Veterinarians from "../../src/components/veterinarians/Veterinarians";
import { withMongo } from "../../src/utils/mongodb-utils";

function VeterinariansPage({vets}) {
    return <Veterinarians vets={vets} />
}

export async function getServerSideProps() {
    let vets = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("vets");

            const result = await collection.find().toArray();
            vets = result.map(vet => mongo.normalizeId(vet));
        });
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            vets
        }
    }
}

export default VeterinariansPage;