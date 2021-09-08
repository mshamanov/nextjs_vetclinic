import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import TitledCard from "../ui/TitledCard";
import VeterinarianDetails from "./VeterinarianDetails";

const ViewVeterinarian = ({vet}) => {
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const onDeleteVetRequestComplete = (error, data) => {
        if (!error) {
            router.push("/vets");
        }
    }

    const deleteVetHandler = () => {
        modal.showConfirm(
            "Confirmation",
            `Are you sure you want to delete ${vet.firstName} ${vet.lastName}?`,
            () => http.sendRequest(`/api/vets?id=${vet.id}`, "DELETE", null, onDeleteVetRequestComplete)
        );
    };

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <TitledCard title="Veterinarian Information">
            <VeterinarianDetails vet={vet} onVetDelete={deleteVetHandler} />
        </TitledCard>
    </Fragment>
}

export default ViewVeterinarian;