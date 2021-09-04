import { Fragment, useContext } from "react";
import Owners from "../../../../src/components/owners/Owners";
import VetContext from "../../../../src/store/vet-context";

const SearchResultPage = ({searchValue}) => {
    const vetCtx = useContext(VetContext);

    const foundOwners = searchValue ? vetCtx.owners.filter(owner => Object.values(owner).reduce((acc, val) => {
        if (typeof val === "string") {
            acc.push(val);
        } else if (Array.isArray(val)) {
            acc.push(val.join(" "))
        }

        return acc;
    }, []).join(" ").toLowerCase().includes(searchValue)) : vetCtx.owners;

    return <Fragment>
        <Owners owners={foundOwners} />
    </Fragment>
}

export async function getServerSideProps(context) {
    const searchValue = context.params.searchValue;

    return {
        props: {
            searchValue
        }
    }
}

export default SearchResultPage;