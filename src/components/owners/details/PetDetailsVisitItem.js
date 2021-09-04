import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import useModal from "../../../hooks/use-modal";
import VetContext from "../../../store/vet-context";
import ActionButton from "../../ui/ActionButton";
import classes from "./PetDetailsVisitItem.module.css";

const PetDetailsVisitItem = ({visit}) => {
    const router = useRouter();
    const vetCtx = useContext(VetContext);
    const [modal, showModal] = useModal();

    const confirmDeleteHandler = () => {
        vetCtx.removeVisit(visit);
    }

    const deleteVisitHandler = () => {
        showModal("Confirmation", `Are you sure you want to delete the visit record?`, confirmDeleteHandler);
    }

    const editVisitHandler = () => {
        router.push(`${visit.pet.owner.id}/pets/${visit.pet.id}/visits/${visit.id}/edit`);
    }

    return <Fragment>
        {modal}
        <li className={classes["pet-visit-item"]}>
            <div className={`${classes["pet-visit-data"]} ${classes["pet-visit-data-date"]}`}>{visit.dateAsString}</div>
            <div className={`${classes["pet-visit-data"]} ${classes["pet-visit-data-description"]}`}>{visit.description}</div>
            <div className={`${classes["pet-visit-data"]} ${classes["pet-visit-data-actions"]} ${classes["pet-visit-data-actions"]}`}>
                <ActionButton small onClick={editVisitHandler}>Edit</ActionButton>
                <ActionButton small danger onClick={deleteVisitHandler}>Delete</ActionButton>
            </div>
        </li>
    </Fragment>
}

export default PetDetailsVisitItem;