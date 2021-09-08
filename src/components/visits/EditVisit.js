import { useRouter } from "next/router";
import { Fragment } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import VisitDTO from "../../models/VisitDTO";
import { parseDateFromInputFormat, parseDateToInputFormat } from "../../utils/common-utils";
import RecordsModifier from "../ui/RecordsModifier";

const EditVisit = ({owner, pet, visit}) => {
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
            defaultValue: parseDateToInputFormat(visit.date)
        },
        description: {
            label: "Description",
            defaultValue: visit.description
        }
    }
    const onUpdateVisitRequestComplete = (error, data) => {
        if (!error) {
            router.push(`/owners/${owner.id}`);
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {date, description} = values;
        const updatedVisit = new VisitDTO(visit.id, parseDateFromInputFormat(date), description);
        http.sendRequest(`/api/visits?ownerId=${owner.id}&petId=${pet.id}`, "PUT", updatedVisit, onUpdateVisitRequestComplete);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler
        }
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <RecordsModifier controls={controls} buttons={buttons} />
    </Fragment>
}

export default EditVisit;