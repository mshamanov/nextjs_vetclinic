import { useRouter } from "next/router";
import { Fragment } from "react";
import { fromISODateToLocaleString } from "../../../utils/common-utils";
import ActionButton from "../../ui/ActionButton";
import classes from "./PetVisitItem.module.css";

const PetVisitItem = ({owner, pet, visit, onVisitDelete}) => {
    const router = useRouter();

    const deleteVisitHandler = () => {
        onVisitDelete(pet, visit);
    }

    const editVisitHandler = () => {
        router.push(`${owner.id}/pets/${pet.id}/visits/${visit.id}/edit`);
    }

    return <Fragment>
        <li className={classes["pet-visit-item"]}>
            <div
                className={`${classes["pet-visit-data"]} ${classes["pet-visit-data-date"]}`}>{fromISODateToLocaleString(visit.date)}</div>
            <div
                className={`${classes["pet-visit-data"]} ${classes["pet-visit-data-description"]}`}>{visit.description}</div>
            <div
                className={`${classes["pet-visit-data"]} ${classes["pet-visit-data-actions"]} ${classes["pet-visit-data-actions"]}`}>
                <ActionButton small onClick={editVisitHandler}>Edit</ActionButton>
                <ActionButton small danger onClick={deleteVisitHandler}>Delete</ActionButton>
            </div>
        </li>
    </Fragment>
}

export default PetVisitItem;