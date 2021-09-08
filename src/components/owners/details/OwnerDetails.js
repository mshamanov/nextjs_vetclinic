import { useRouter } from "next/router";
import { Fragment } from "react";
import { getKeyValuePairs, mapKeyAsTitle } from "../../../utils/common-utils";
import ActionButton from "../../ui/ActionButton";
import Actions from "../../ui/Actions";
import DetailsList from "../../ui/details/DetailsList";

const OwnerDetails = ({owner, onOwnerDelete}) => {
    const router = useRouter();

    const deleteOwnerHandler = () => {
        onOwnerDelete();
    };

    const editOwnerHandler = () => {
        router.push(`${owner.id}/edit`);
    }

    const addPetHandler = () => {
        router.push(`${owner.id}/pets/add`);
    }

    const list = getKeyValuePairs(owner, mapKeyAsTitle);

    return <Fragment>
        <DetailsList list={list} />
        <Actions>
            <ActionButton medium onClick={editOwnerHandler}>Edit Owner</ActionButton>
            <ActionButton medium onClick={addPetHandler}>Add New Pet</ActionButton>
            <ActionButton medium danger onClick={deleteOwnerHandler}>Delete Owner</ActionButton>
        </Actions>
    </Fragment>
}

export default OwnerDetails;