import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import useModal from "../../../hooks/use-modal";
import VetContext from "../../../store/vet-context";
import ActionButton from "../../ui/ActionButton";
import Actions from "../../ui/Actions";
import classes from "./PetDetails.module.css";
import PetDetailsInfo from "./PetDetailsInfo";
import PetDetailsVisits from "./PetDetailsVisits";

const PetDetails = ({pet}) => {
    const router = useRouter();
    const vetCtx = useContext(VetContext);
    const [modal, showModal] = useModal();

    const confirmDeleteHandler = () => {
        vetCtx.removePet(pet);
    }

    const deletePetHandler = () => {
        showModal("Confirmation", `Are you sure you want to delete ${pet}?`, confirmDeleteHandler);
    }

    const editPetHandler = () => {
        router.push(`${pet.owner.id}/pets/${pet.id}/edit`);
    }

    const addVisitHandler = () => {
        router.push(`${pet.owner.id}/pets/${pet.id}/visits/add`);
    };

    return <Fragment>
        {modal}
        <div className={classes["pet-details-group"]}>
            <div className={classes["pet-details-item"]}>
                <PetDetailsInfo pet={pet} />
                <Actions>
                    <ActionButton medium onClick={editPetHandler}>Edit Pet</ActionButton>
                    <ActionButton medium danger onClick={deletePetHandler}>Delete Pet</ActionButton>
                </Actions>
            </div>
            <div className={`${classes["pet-details-item"]} ${classes["pet-details-visits-item"]}`}>
                <PetDetailsVisits visits={pet.visits} />
                <Actions>
                    <ActionButton medium onClick={addVisitHandler}>Add Visit</ActionButton>
                </Actions>
            </div>
        </div>
    </Fragment>
}

export default PetDetails;