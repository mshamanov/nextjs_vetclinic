import Owners from "../../../../src/components/owners/Owners";
import { withMongo } from "../../../../src/utils/mongodb-utils";

const SearchResultPage = ({owners}) => {
    return <Owners owners={owners} />
}

export async function getServerSideProps(context) {
    const input = context.params.searchValue;

    let owners = null;

    try {
        await withMongo(async (mongo) => {
            const collection = mongo.db.collection("owners");
            const findOptions = {$regex: input, $options: "i"};
            const arrayFindInOptions = {$in: [new RegExp(input, "i")]};

            const result = await collection.find({
                $or: [
                    {"firstName": findOptions},
                    {"lastName": findOptions},
                    {"address": findOptions},
                    {"phone": findOptions},
                    {"email": findOptions},
                    {"pets.name": arrayFindInOptions},
                    {"pets.type": arrayFindInOptions},
                    {"pets.visits.description": arrayFindInOptions}
                ]
            }).toArray();

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

export default SearchResultPage;