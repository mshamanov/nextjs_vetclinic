import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import PetDTO from "../../models/PetDTO";
import { parseDateFromInputFormat } from "../../utils/common-utils";
import RecordsModifier from "../ui/RecordsModifier";

const AddPet = ({owner}) => {
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const controls = {
        owner: {
            label: "Owner",
            defaultValue: `${owner.firstName} ${owner.lastName}`,
            disabled: true
        },
        name: {
            label: "Name",
        },
        birthDate: {
            label: "Birth Date",
            type: "date"
        },
        type: {
            label: "Type",
        }
    }

    const onAddPetRequestComplete = (error, data) => {
        if (!error) {
            router.push(`/owners/${owner.id}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {name, birthDate, type} = values;
        const newPet = new PetDTO("", name, parseDateFromInputFormat(birthDate), type);
        http.sendRequest(`/api/pets?ownerId=${owner.id}`, "POST", newPet, onAddPetRequestComplete);
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
        <RecordsModifier title="Add New Pet" controls={controls} buttons={buttons} />
    </Fragment>
}

export default AddPet;