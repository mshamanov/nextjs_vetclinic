import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import VetDTO from "../../models/VetDTO";
import RecordsModifier from "../ui/RecordsModifier";

const EditVet = ({vet}) => {
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const controls = {
        firstName: {
            label: "First Name",
            defaultValue: vet.firstName
        },
        lastName: {
            label: "Last Name",
            defaultValue: vet.lastName
        },
        address: {
            label: "Address",
            defaultValue: vet.address
        },
        phone: {
            label: "Phone",
            defaultValue: vet.phone
        },
        email: {
            label: "Email",
            type: "email",
            defaultValue: vet.email
        },
        specialities: {
            label: "Specialities (comma separated)",
            defaultValue: vet.specialities.join(", ")
        }
    }

    function onUpdateVetRequestComplete(error, data) {
        if (!error) {
            router.push(`/vets/${vet.id}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {firstName, lastName, address, phone, email, specialities} = values;

        const newVet = new VetDTO(vet.id, firstName, lastName, address, phone, email, ...specialities.split(/\s*,\s*/));
        http.sendRequest(`/api/vets`, "PUT", newVet, onUpdateVetRequestComplete);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler
        }
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <RecordsModifier title="Edit Veterinarian" controls={controls} buttons={buttons} />
    </Fragment>
}

export default EditVet;