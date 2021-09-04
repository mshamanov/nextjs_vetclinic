import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../../../../src/components/ui/RecordsModifier";
import VetContext from "../../../../../../src/store/vet-context";
import { parseDateFromInputFormat, parseDateToInputFormat } from "../../../../../../src/utils/common-utils";
import Custom404 from "../../../../../404";

const EditPetPage = ({ownerId, petId}) => {
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
            defaultValue: pet.owner,
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

    const sumbitHandler = (event, values) => {
        event.preventDefault();

        let {name, birthDate, type} = values;
        birthDate = parseDateFromInputFormat(birthDate);

        const updatedPet = pet.clone();
        Object.assign(updatedPet, {name, birthDate, type});

        vetCtx.addPet(updatedPet);
        router.push(`/owners/${pet.owner.id}`);
    }

    const buttons = {
        submit: {
            onSubmit: sumbitHandler
        }
    }

    return <RecordsModifier title="Edit Pet" controls={controls} buttons={buttons} />
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

export default EditPetPage;