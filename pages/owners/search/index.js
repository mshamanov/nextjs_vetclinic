import Owners from "../../../src/components/owners/Owners";
import { withMongo } from "../../../src/utils/mongodb-utils";

const SearchPage = ({owners}) => {
    return <Owners owners={owners} />
}

export async function getServerSideProps() {
    let owners = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("owners");

            const result = await collection.find().toArray();
            owners = result.map(owner => mongo.normalizeId(owner));
        });
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            owners
        }
    }
}

export default SearchPage;