import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import { parseDateFromInputFormat, parseDateToInputFormat } from "../../utils/common-utils";
import RecordsModifier from "../ui/RecordsModifier";

const EditPet = ({owner, pet}) => {
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
            defaultValue: pet.name,
        },
        birthDate: {
            label: "Birth Date",
            defaultValue: parseDateToInputFormat(pet.birthDate),
            type: "date"
        },
        type: {
            label: "Type",
            defaultValue: pet.type,
        }
    }

    const onUpdatePetRequestComplete = (error, data) => {
        if (!error) {
            router.push(`/owners/${owner.id}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        let {name, birthDate, type} = values;
        birthDate = parseDateFromInputFormat(birthDate);
        const updatedPet = {...pet, name, birthDate, type};

        http.sendRequest(`/api/pets?ownerId=${owner.id}`, "PUT", updatedPet, onUpdatePetRequestComplete);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler
        }
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <RecordsModifier title="Edit Pet" controls={controls} buttons={buttons} />
    </Fragment>
}

export default EditPet;