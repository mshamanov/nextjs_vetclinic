import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import VetDTO from "../../models/VetDTO";
import RecordsModifier from "../ui/RecordsModifier";

const AddVet = () => {
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const controls = {
        firstName: {
            label: "First Name",
        },
        lastName: {
            label: "Last Name",
        },
        address: {
            label: "Address",
        },
        phone: {
            label: "Phone",
        },
        email: {
            label: "Email",
            type: "email"
        },
        specialities: {
            label: "Specialities (comma separated)"
        }
    }

    function onAddVetRequestComplete(error, data) {
        if (!error) {
            router.push(`/vets/${data.result.insertedId}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {firstName, lastName, address, phone, email, specialities} = values;

        const newVet = new VetDTO("", firstName, lastName, address, phone, email, ...specialities.split(/\s*,\s*/));
        http.sendRequest(`/api/vets`, "POST", newVet, onAddVetRequestComplete);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler,
            value: "Add"
        }
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <RecordsModifier title="Add New Vet" controls={controls} buttons={buttons} />
    </Fragment>
}

export default AddVet;