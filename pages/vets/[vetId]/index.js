import { useContext } from "react";
import ViewVeterinarian from "../../../src/components/veterinarians/ViewVeterinarian";
import VetContext from "../../../src/store/vet-context";
import Custom404 from "../../404";

const ViewVetPage = ({vetId}) => {
    const vetCtx = useContext(VetContext);

    const vet = vetCtx.vets.find(vet => vet.id === vetId);

    if (!vet) {
        return <Custom404 />
    }

    return <ViewVeterinarian vet={vet} />
}

export async function getServerSideProps(context) {
    const vetId = context.params.vetId;

    return {
        props: {
            vetId
        }
    }
}

export default ViewVetPage;