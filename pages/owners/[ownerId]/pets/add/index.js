import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../../../src/components/ui/RecordsModifier";
import Pet from "../../../../../src/models/Pet";
import VetContext from "../../../../../src/store/vet-context";
import { parseDateFromInputFormat } from "../../../../../src/utils/common-utils";
import Custom404 from "../../../../404";

const AddPetPage = ({ownerId}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const owner = vetCtx.owners.find(owner => owner.id === ownerId);

    if (!owner) {
        return <Custom404 />
    }

    const controls = {
        owner: {
            label: "Owner",
            defaultValue: owner,
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

    const sumbitHandler = (event, values) => {
        event.preventDefault();

        const {name, birthDate, type} = values;
        const newPet = new Pet(name, parseDateFromInputFormat(birthDate), type, owner);

        vetCtx.addPet(newPet);
        router.push(`/owners/${owner.id}`);
    }

    const buttons = {
        submit: {
            onSubmit: sumbitHandler,
            value: "Add"
        }
    }

    return <RecordsModifier title="Add New Pet" controls={controls} buttons={buttons} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;

    return {
        props: {
            ownerId,
        }
    }
}

export default AddPetPage;