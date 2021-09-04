import { useRouter } from "next/router";
import { useContext } from "react";
import RecordsModifier from "../../../../src/components/ui/RecordsModifier";
import VetContext from "../../../../src/store/vet-context";
import Custom404 from "../../../404";

const EditOwnerPage = ({ownerId}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();

    const owner = vetCtx.owners.find(owner => owner.id === ownerId);

    if (!owner) {
        return <Custom404 />
    }

    const controls = {
        firstName: {
            label: "First Name",
            defaultValue: owner.firstName,
        },
        lastName: {
            label: "Last Name",
            defaultValue: owner.lastName,
        },
        address: {
            label: "Address",
            defaultValue: owner.address,
        },
        phone: {
            label: "Phone",
            defaultValue: owner.phone,
        },
        email: {
            label: "Email",
            defaultValue: owner.email,
            type: "email"
        }
    }

    const sumbitHandler = (event, values) => {
        event.preventDefault();

        const updatedOwner = owner.clone();
        Object.assign(updatedOwner, values);

        vetCtx.addOwner(updatedOwner);
        router.back();
    }

    const buttons = {
        submit: {
            onSubmit: sumbitHandler
        }
    }

    return <RecordsModifier title="Edit Owner" controls={controls} buttons={buttons} />
}

export async function getServerSideProps(context) {
    const ownerId = context.params.ownerId;

    return {
        props: {
            ownerId
        }
    }
}

export default EditOwnerPage;