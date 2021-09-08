import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import OwnerDTO from "../../models/OwnerDTO";
import RecordsModifier from "../ui/RecordsModifier";

const EditOwner = ({owner}) => {
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const controls = {
        firstName: {
            label: "First Name",
            defaultValue: owner.firstName,
        },
        lastName: {
            label: "Last Name",
            defaultValue: owner.lastName,
        },
        address: {
            label: "Address",
            defaultValue: owner.address,
        },
        phone: {
            label: "Phone",
            defaultValue: owner.phone,
        },
        email: {
            label: "Email",
            defaultValue: owner.email,
            type: "email"
        }
    }

    const onUpdateOwnerRequestComplete = (error, data) => {
        if (!error) {
            router.push(`/owners/${owner.id}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {firstName, lastName, address, phone, email} = values;
        const updatedOwner = new OwnerDTO(owner.id, firstName, lastName, address, phone, email);

        http.sendRequest(`/api/owners`, "PUT", updatedOwner, onUpdateOwnerRequestComplete);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler
        }
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <RecordsModifier title="Edit Owner" controls={controls} buttons={buttons} />
    </Fragment>
}

export default EditOwner;