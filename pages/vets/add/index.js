import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../src/components/ui/RecordsModifier";
import Vet from "../../../src/models/Vet";
import VetContext from "../../../src/store/vet-context";

const AddVetPage = () => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const controls = {
        firstName: {
            label: "First Name",
        },
        lastName: {
            label: "Last Name",
        },
        address: {
            label: "Address",
        },
        phone: {
            label: "Phone",
        },
        email: {
            label: "Email",
            type: "email"
        },
        specialities: {
            label: "Specialities (comma separated)"
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {firstName, lastName, address, phone, email, specialities} = values;
        const newVet = new Vet(firstName, lastName, address, phone, email, ...specialities.split(/\s*,\s*/));

        vetCtx.addVet(newVet);
        router.push(`/vets/${newVet.id}`);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler,
            value: "Add"
        }
    }

    return <RecordsModifier title="Add New Vet" controls={controls} buttons={buttons} />
}

export default AddVetPage;