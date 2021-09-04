import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../../../../../../src/components/ui/RecordsModifier";
import VetContext from "../../../../../../../../src/store/vet-context";
import { parseDateFromInputFormat, parseDateToInputFormat } from "../../../../../../../../src/utils/common-utils";
import Custom404 from "../../../../../../../404";

const EditVisitPage = ({ownerId, petId, visitId}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const owner = vetCtx.owners.find(owner => owner.id === ownerId);
    const pet = owner.pets.find(pet => pet.id === petId);
    const visit = pet.visits.find(visit => visit.id === visitId);

    if (!owner || !pet) {
        return <Custom404 />
    }

    const controls = {
        owner: {
            label: "Owner",
            defaultValue: owner,
            disabled: true
        },
        pet: {
            label: "Pet",
            defaultValue: pet,
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

    const sumbitHandler = (event, values) => {
        event.preventDefault();

        let {date, description} = values;
        date = parseDateFromInputFormat(date);

        const updatedVisit = visit.clone();
        Object.assign(updatedVisit, {date, description});

        vetCtx.addVisit(updatedVisit);
        router.push(`/owners/${owner.id}`);
    }

    const buttons = {
        submit: {
            onSubmit: sumbitHandler
        }
    }

    return <RecordsModifier controls={controls} buttons={buttons} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;
    const petId = context.params.petId;
    const visitId = context.params.visitId;

    return {
        props: {
            ownerId,
            petId,
            visitId
        }
    }
}

export default EditVisitPage;