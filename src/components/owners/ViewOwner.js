import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import TitledCard from "../ui/TitledCard";
import OwnerDetails from "./details/OwnerDetails";
import PetDetails from "./details/PetDetails";
import classes from "./ViewOwner.module.css";

const ViewOwner = ({owner}) => {
    const router = useRouter();
    const [ownerData, setOwnerData] = useState(owner);
    const {modal, http, spinner} = useHttpRequest();

    const onDeleteOwnerRequestComplete = (error, data) => {
        if (!error) {
            router.push("/owners");
        }
    }

    const deleteOwnerHandler = () => {
        modal.showConfirm(
            "Confirmation",
            `Are you sure you want to delete ${owner.firstName} ${owner.lastName}?`,
            () => http.sendRequest(`/api/owners?id=${ownerData.id}`, "DELETE", null, onDeleteOwnerRequestComplete)
        );
    };

    const onDeletePetRequestComplete = (error, data, pet) => {
        if (!error) {
            setOwnerData(prevOwner => {
                const updatedOwner = {...prevOwner};
                updatedOwner.pets = updatedOwner.pets.filter(p => p.id !== pet.id);
                return updatedOwner;
            });
        }
    }

    const deletePetHandler = (pet) => {
        modal.showConfirm(
            "Confirmation",
            `Are you sure you want to delete ${pet.type} ${pet.name}?`,
            () => http.sendRequest(`/api/pets?id=${pet.id}&ownerId=${ownerData.id}`, "DELETE", null, (error, data) => onDeletePetRequestComplete(error, data, pet))
        );
    };

    const onDeleteVisitRequestComplete = (error, data, pet, visit) => {
        if (!error) {
            setOwnerData(prevOwner => {
                const updatedOwner = {...prevOwner};
                const petIdx = updatedOwner.pets.findIndex(p => p.id === pet.id);
                updatedOwner.pets[petIdx].visits = updatedOwner.pets[petIdx].visits.filter(v => v.id !== visit.id);
                return updatedOwner;
            });
        }
    }

    const deleteVisitHandler = (pet, visit) => {
        modal.showConfirm("Confirmation", `Are you sure you want to delete the record?`,
            () => http.sendRequest(`/api/visits?id=${visit.id}&petId=${pet.id}&ownerId=${ownerData.id}`, "DELETE", null, (error, data) => onDeleteVisitRequestComplete(error, data, pet, visit))
        );
    };

    let petsContent = <p className={classes["no-pets"]}>No Pets</p>;

    if (ownerData.pets && ownerData.pets.length > 0) {
        petsContent = ownerData.pets.map(pet => <PetDetails key={pet.id} owner={owner} pet={pet}
                                                            onPetDelete={deletePetHandler}
                                                            onVisitDelete={deleteVisitHandler} />);
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <TitledCard title="Owner Information">
            <OwnerDetails owner={ownerData} onOwnerDelete={deleteOwnerHandler} />
        </TitledCard>
        <TitledCard title="Pets and Visits">
            {petsContent}
        </TitledCard>
    </Fragment>
}

export default ViewOwner;