import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../src/components/ui/RecordsModifier";
import Owner from "../../../src/models/Owner";
import VetContext from "../../../src/store/vet-context";

const AddOwnerPage = () => {
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
        }
    }

    const submitHandler = (event, values) => {
        event.preventDefault();

        const {firstName, lastName, address, phone, email} = values;
        const newOwner = new Owner(firstName, lastName, address, phone, email);

        vetCtx.addOwner(newOwner);
        router.push(`/owners/${newOwner.id}`);
    }

    const buttons = {
        submit: {
            onSubmit: submitHandler,
            value: "Add"
        }
    }

    return <RecordsModifier title="Add New Owner" controls={controls} buttons={buttons} />
}

export default AddOwnerPage;