import { useContext } from "react";
import ViewOwner from "../../../src/components/owners/ViewOwner";
import VetContext from "../../../src/store/vet-context";
import Custom404 from "../../404";

const ViewOwnerPage = ({ownerId}) => {
    const vetCtx = useContext(VetContext);

    const owner = vetCtx.owners.find(owner => owner.id === ownerId);

    if (!owner) {
        return <Custom404 />
    }

    return <ViewOwner owner={owner} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;

    return {
        props: {
            ownerId
        }
    }
}

export default ViewOwnerPage;