import { Fragment } from "react";
import TitledCard from "../ui/TitledCard";
import OwnerDetails from "./details/OwnerDetails";
import PetDetails from "./details/PetDetails";
import classes from "./ViewOwner.module.css";

const ViewOwner = ({owner}) => {
    let petsContent = <p className={classes["no-pets"]}>No Pets</p>;

    if (owner.pets && owner.pets.length > 0) {
        petsContent = owner.pets.map(pet => <PetDetails key={pet.id} pet={pet} />);
    }

    return <Fragment>
        <TitledCard title="Owner Information">
            <OwnerDetails owner={owner} />
        </TitledCard>
        <TitledCard title="Pets and Visits">
            {petsContent}
        </TitledCard>
    </Fragment>
}

export default ViewOwner;