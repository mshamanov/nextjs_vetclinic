import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import useModal from "../../hooks/use-modal";
import VetContext from "../../store/vet-context";
import ActionButton from "../ui/ActionButton";
import Actions from "../ui/Actions";
import Table from "../ui/Table";
import TitledCard from "../ui/TitledCard";
import classes from "./Veterinarians.module.css";

const Veterinarians = ({vets}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();
    const [modal, showModal] = useModal();

    const viewVeterinarianHandler = (vetId) => {
        router.push(`/vets/${vetId}`);
    }

    const confirmDeleteHandler = (vetId) => {
        vetCtx.removeVet(vetId);
    }

    const deleteVeterinarianHandler = (vetId) => {
        const vet = vetCtx.vets.find(vet => vet.id === vetId);
        showModal("Confirmation", `Are you sure you want to delete ${vet}?`,
            () => confirmDeleteHandler(vetId));
    };

    const addVeterinarianHandler = () => {
        router.push(`/vets/add`);
    }

    if (!vets || (vets && vets.length === 0)) {
        return <Fragment>
            <h1 className="title">No Veterinarians</h1>
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
        records: vets
    }

    return <div className={classes.vets}>
        {modal}
        <TitledCard title="Veterinarians">
            <Table contents={tableContents} onView={viewVeterinarianHandler} onDelete={deleteVeterinarianHandler} />
        </TitledCard>
        <Actions className={classes.actions}>
            <ActionButton medium onClick={addVeterinarianHandler}>Add New Veterinarian</ActionButton>
        </Actions>
    </div>
}

export default Veterinarians;