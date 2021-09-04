import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import useModal from "../../../hooks/use-modal";
import VetContext from "../../../store/vet-context";
import { getKeyValuePairs, mapKeyAsTitle } from "../../../utils/common-utils";
import ActionButton from "../../ui/ActionButton";
import Actions from "../../ui/Actions";
import DetailsList from "../../ui/details/DetailsList";

const OwnerDetails = ({owner}) => {
    const [modal, showModal] = useModal();
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const confirmDeleteHandler = () => {
        vetCtx.removeOwner(owner.id);
        router.back();
    }

    const deleteOwnerHandler = () => {
        showModal("Confirmation", `Are you sure you want to delete ${owner}?`, confirmDeleteHandler);
    };

    const editOwnerHandler = () => {
        router.push(`${owner.id}/edit`);
    }

    const addPetHandler = () => {
        router.push(`${owner.id}/pets/add`);
    }

    const list = getKeyValuePairs(owner, mapKeyAsTitle);

    return <Fragment>
        {modal}
        <DetailsList list={list} />
        <Actions>
            <ActionButton medium onClick={editOwnerHandler}>Edit Owner</ActionButton>
            <ActionButton medium onClick={addPetHandler}>Add New Pet</ActionButton>
            <ActionButton medium danger onClick={deleteOwnerHandler}>Delete Owner</ActionButton>
        </Actions>
    </Fragment>
}

export default OwnerDetails;