import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import useModal from "../../hooks/use-modal";
import VetContext from "../../store/vet-context";
import { getKeyValuePairs, mapKeyAsTitle } from "../../utils/common-utils";
import ActionButton from "../ui/ActionButton";
import Actions from "../ui/Actions";
import DetailsList from "../ui/details/DetailsList";

const VeterinarianDetails = ({vet}) => {
    const [modal, showModal] = useModal();
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const confirmDeleteHandler = () => {
        vetCtx.removeVet(vet.id);
        router.back();
    }

    const deleteVetHandler = () => {
        showModal("Confirmation", `Are you sure you want to delete ${vet}?`, confirmDeleteHandler);
    };

    const editVetHandler = () => {
        router.push(`${vet.id}/edit`);
    }

    const list = getKeyValuePairs(vet, mapKeyAsTitle);
    list.push({
        key: "Specialities",
        value: vet.specialities.join(", ")
    });

    return <Fragment>
        {modal}
        <DetailsList list={list} />
        <Actions>
            <ActionButton medium onClick={editVetHandler}>Edit Veterinarian</ActionButton>
            <ActionButton medium danger onClick={deleteVetHandler}>Delete Veterinarian</ActionButton>
        </Actions>
    </Fragment>
}

export default VeterinarianDetails;