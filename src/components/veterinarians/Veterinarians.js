import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import ActionButton from "../ui/ActionButton";
import Actions from "../ui/Actions";
import Table from "../ui/Table";
import TitledCard from "../ui/TitledCard";
import classes from "./Veterinarians.module.css";

const Veterinarians = ({vets}) => {
    const router = useRouter();
    const [vetsData, setVetsData] = useState(vets);
    const {modal, http, spinner} = useHttpRequest();

    const viewVeterinarianHandler = (vetId) => {
        router.push(`/vets/${vetId}`);
    }

    const onDeleteVetRequestComplete = (error, data, vetId) => {
        if (!error) {
            setVetsData(prevVets => prevVets.filter(v => v.id !== vetId));
        }
    }

    const confirmDeleteHandler = (vetId) => {
        http.sendRequest(`/api/vets?id=${vetId}`, "DELETE", null, (error, data) => onDeleteVetRequestComplete(error, data, vetId));
    }

    const deleteVeterinarianHandler = (vetId) => {
        const vet = vetsData.find(vet => vet.id === vetId);
        modal.showConfirm("Confirmation", `Are you sure you want to delete ${vet.firstName} ${vet.lastName}?`,
            () => confirmDeleteHandler(vetId));
    };

    const addVeterinarianHandler = () => {
        router.push(`/vets/add`);
    }

    if (!vetsData || (vetsData && vetsData.length === 0)) {
        return <Fragment>
            <h1 className="title">No Veterinarians</h1>
            <p />
            <ActionButton medium onClick={addVeterinarianHandler}>Add New Veterinarian</ActionButton>
        </Fragment>
    }

    const mapEmail = (value) => {
        return <a key={value} href={`mailto:${value}`}>{value}</a>;
    }

    const mapSpecialities = (value) => {
        return <div className={classes.specialities}>{value.join(", ")}</div>;
    }

    const tableContents = {
        headers: [
            {name: "id", fieldName: "id"},
            {name: "First Name", fieldName: "firstName"},
            {name: "Last Name", fieldName: "lastName"},
            {name: "Phone", fieldName: "phone"},
            {name: "Email", fieldName: "email", mapFn: mapEmail},
            {
                name: "Specialities",
                fieldName: "specialities",
                mapFn: mapSpecialities
            }
        ],
        records: vetsData
    }

    return <div className={classes.vets}>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <TitledCard title="Veterinarians">
            <Table contents={tableContents} onView={viewVeterinarianHandler} onDelete={deleteVeterinarianHandler} />
        </TitledCard>
        <Actions className={classes.actions}>
            <ActionButton medium onClick={addVeterinarianHandler}>Add New Veterinarian</ActionButton>
        </Actions>
    </div>
}

export default Veterinarians;