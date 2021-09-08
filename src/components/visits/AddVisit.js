import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import VisitDTO from "../../models/VisitDTO";
import { parseDateFromInputFormat, parseDateToInputFormat } from "../../utils/common-utils";
import RecordsModifier from "../ui/RecordsModifier";

const AddVisit = ({owner, pet}) => {
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const controls = {
        owner: {
            label: "Owner",
            defaultValue: `${owner.firstName} ${owner.lastName}`,
            disabled: true
        },
        pet: {
            label: "Pet",
            defaultValue: `${pet.type} ${pet.name}`,
            disabled: true
        },
        date: {
            label: "Date",
            type: "date",
            defaultValue: parseDateToInputFormat(new Date())
        },
        description: {
            label: "Description",
        }
    }

    const onAddVisitRequestComplete = (error, data) => {
        if (!error) {
            router.push(`/owners/${owner.id}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {date, description} = values;
        const newVisit = new VisitDTO("", parseDateFromInputFormat(date), description);
        http.sendRequest(`/api/visits?ownerId=${owner.id}&petId=${pet.id}`, "POST", newVisit, onAddVisitRequestComplete);
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
        <RecordsModifier controls={controls} buttons={buttons} />
    </Fragment>
}

export default AddVisit;