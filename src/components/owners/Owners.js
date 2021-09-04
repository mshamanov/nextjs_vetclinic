import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import useModal from "../../hooks/use-modal";
import VetContext from "../../store/vet-context";
import Table from "../ui/Table";
import TitledCard from "../ui/TitledCard";

const Owners = ({owners}) => {
    const vetCtx = useContext(VetContext);
    const router = useRouter();
    const [modal, showModal] = useModal();

    const viewOwnerHandler = (ownerId) => {
        router.push(`/owners/${ownerId}`);
    }

    const confirmDeleteHandler = (ownerId) => {
        vetCtx.removeOwner(ownerId);
    }

    const deleteOwnerHandler = (ownerId) => {
        const owner = vetCtx.owners.find(owner => owner.id === ownerId);
        showModal("Confirmation", `Are you sure you want to delete ${owner}?`, () => confirmDeleteHandler(ownerId));
    };

    if (!owners || (owners && owners.length === 0)) {
        return <h1 className="title">No Results Found</h1>
    }

    const mapEmail = (value) => {
        return <a key={value} href={`mailto:${value}`}>{value}</a>;
    }

    const tableContents = {
        headers: [
            {name: "id", fieldName: "id"},
            {name: "First Name", fieldName: "firstName"},
            {name: "Last Name", fieldName: "lastName"},
            {name: "Phone", fieldName: "phone"},
            {name: "Email", fieldName: "email", mapEmail}
        ],
        records: owners
    }

    return <Fragment>
        {modal}
        <TitledCard title="Owners">
            <Table contents={tableContents} onView={viewOwnerHandler} onDelete={deleteOwnerHandler} />
        </TitledCard>
    </Fragment>
}

export default Owners;