import { useRouter } from "next/router";
import { Fragment } from "react";
import { getKeyValuePairs, mapKeyAsTitle } from "../../utils/common-utils";
import ActionButton from "../ui/ActionButton";
import Actions from "../ui/Actions";
import DetailsList from "../ui/details/DetailsList";

const VeterinarianDetails = ({vet, onVetDelete}) => {
    const router = useRouter();

    const editVetHandler = () => {
        router.push(`${vet.id}/edit`);
    }

    const list = getKeyValuePairs(vet, mapKeyAsTitle);
    list.push({
        key: "Specialities",
        value: vet.specialities.join(", ")
    });

    return <Fragment>
        <DetailsList list={list} />
        <Actions>
            <ActionButton medium onClick={editVetHandler}>Edit Veterinarian</ActionButton>
            <ActionButton medium danger onClick={onVetDelete}>Delete Veterinarian</ActionButton>
        </Actions>
    </Fragment>
}

export default VeterinarianDetails;