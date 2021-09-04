import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../../../../../src/components/ui/RecordsModifier";
import Visit from "../../../../../../../src/models/Visit";
import VetContext from "../../../../../../../src/store/vet-context";
import { parseDateFromInputFormat, parseDateToInputFormat } from "../../../../../../../src/utils/common-utils";
import Custom404 from "../../../../../../404";


const AddVisitPage = ({ownerId, petId}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const owner = vetCtx.owners.find(owner => owner.id === ownerId);
    const pet = owner.pets.find(pet => pet.id === petId);

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
            defaultValue: parseDateToInputFormat(new Date())
        },
        description: {
            label: "Description",
        }
    }

    const sumbitHandler = (event, values) => {
        event.preventDefault();

        const {date, description} = values;
        const newVisit = new Visit(parseDateFromInputFormat(date), description, pet);

        vetCtx.addVisit(newVisit);
        router.push(`/owners/${owner.id}`);
    }

    const buttons = {
        submit: {
            onSubmit: sumbitHandler,
            value: "Add"
        }
    }

    return <RecordsModifier controls={controls} buttons={buttons} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;
    const petId = context.params.petId;

    return {
        props: {
            ownerId,
            petId
        }
    }
}

export default AddVisitPage;