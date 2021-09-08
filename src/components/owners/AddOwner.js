import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import OwnerDTO from "../../models/OwnerDTO";
import RecordsModifier from "../ui/RecordsModifier";

const AddOwner = () => {
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
        }
    }

    function onAddOwnerRequestComplete(error, data) {
        if (!error) {
            router.push(`/owners/${data.result.insertedId}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {firstName, lastName, address, phone, email} = values;
        const newOwner = new OwnerDTO("", firstName, lastName, address, phone, email);

        http.sendRequest(`/api/owners`, "POST", newOwner, onAddOwnerRequestComplete);
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
        <RecordsModifier title="Add New Owner" controls={controls} buttons={buttons} />
    </Fragment>
}

export default AddOwner;