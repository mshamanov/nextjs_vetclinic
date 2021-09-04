import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../../src/components/ui/RecordsModifier";
import VetContext from "../../../../src/store/vet-context";
import Custom404 from "../../../404";

const EditVetPage = ({vetId}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const vet = vetCtx.vets.find(vet => vet.id === vetId);

    if (!vet) {
        return <Custom404 />
    }

    const controls = {
        firstName: {
            label: "First Name",
            defaultValue: vet.firstName
        },
        lastName: {
            label: "Last Name",
            defaultValue: vet.lastName
        },
        address: {
            label: "Address",
            defaultValue: vet.address
        },
        phone: {
            label: "Phone",
            defaultValue: vet.phone
        },
        email: {
            label: "Email",
            type: "email",
            defaultValue: vet.email
        },
        specialities: {
            label: "Specialities (comma separated)",
            defaultValue: vet.specialities.join(", ")
        }
    }

    const sumbitHandler = (event, values) => {
        event.preventDefault();

        const updatedVet = vet.clone();
        let {specialities, ...rest} = values;
        specialities = specialities.split(/\s*,\s*/);

        Object.assign(updatedVet, {...rest}, {specialities});
        vetCtx.addVet(updatedVet);
        router.back();
    }

    const buttons = {
        submit: {
            onSubmit: sumbitHandler
        }
    }

    return <RecordsModifier title="Edit Veterinarian" controls={controls} buttons={buttons} />
}

export async function getServerSideProps(context) {
    const vetId = context.params.vetId;

    return {
        props: {
            vetId
        }
    }
}

export default EditVetPage;