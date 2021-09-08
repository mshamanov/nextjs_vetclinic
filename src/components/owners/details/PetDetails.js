import { useRouter } from "next/router";
import { Fragment } from "react";
import ActionButton from "../../ui/ActionButton";
import Actions from "../../ui/Actions";
import classes from "./PetDetails.module.css";
import PetInfoSection from "./PetInfoSection";
import PetVisitsSection from "./PetVisitsSection";

const PetDetails = ({owner, pet, onPetDelete, onVisitDelete}) => {
    const router = useRouter();

    const deletePetHandler = () => {
        onPetDelete(pet);
    }

    const editPetHandler = () => {
        router.push(`${owner.id}/pets/${pet.id}/edit`);
    }

    const addVisitHandler = () => {
        router.push(`${owner.id}/pets/${pet.id}/visits/add`);
    };

    return <Fragment>
        <div className={classes["pet-details-group"]}>
            <div className={classes["pet-details-item"]}>
                <PetInfoSection pet={pet} />
                <Actions>
                    <ActionButton medium onClick={editPetHandler}>Edit Pet</ActionButton>
                    <ActionButton medium danger onClick={deletePetHandler}>Delete Pet</ActionButton>
                </Actions>
            </div>
            <div className={`${classes["pet-details-item"]} ${classes["pet-details-visits-item"]}`}>
                <PetVisitsSection owner={owner} pet={pet} onVisitDelete={onVisitDelete}/>
                <Actions>
                    <ActionButton medium onClick={addVisitHandler}>Add Visit</ActionButton>
                </Actions>
            </div>
        </div>
    </Fragment>
}

export default PetDetails;