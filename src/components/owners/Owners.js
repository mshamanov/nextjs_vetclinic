import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useHttpRequest from "../../hooks/use-http-request";
import ActionButton from "../ui/ActionButton";
import Table from "../ui/Table";
import TitledCard from "../ui/TitledCard";

const Owners = ({owners}) => {
    const [ownersData, setOwnersData] = useState(owners);
    const router = useRouter();
    const {modal, http, spinner} = useHttpRequest();

    const viewOwnerHandler = (ownerId) => {
        router.push(`/owners/${ownerId}`);
    }

    const onDeleteOwnerRequestComplete = (error, data, ownerId) => {
        if (!error) {
            setOwnersData(prevOwnersData => prevOwnersData.filter(owner => owner.id !== ownerId));
        }
    }

    const confirmDeleteHandler = (ownerId) => {
        http.sendRequest(`/api/owners?id=${ownerId}`, "DELETE", null, (error, data) => onDeleteOwnerRequestComplete(error, data, ownerId));
    }

    const deleteOwnerHandler = (ownerId) => {
        const owner = ownersData.find(owner => owner.id === ownerId);
        modal.showConfirm("Confirmation", `Are you sure you want to delete ${owner.firstName} ${owner.lastName}?`, () => confirmDeleteHandler(ownerId));
    };

    const addOwnerHandler = () => {
        router.push(`/owners/add`);
    }

    if (!ownersData || (ownersData && ownersData.length === 0)) {
        return <Fragment><h1 className="title">No Results Found</h1>
            <p />
            <ActionButton medium onClick={addOwnerHandler}>Add New Owner</ActionButton>
        </Fragment>
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
            {name: "Email", fieldName: "email", mapFn: mapEmail}
        ],
        records: ownersData
    }

    return <Fragment>
        {modal.modalDialog}
        {spinner.spinnerDialog}
        <TitledCard title="Owners">
            <Table contents={tableContents} onView={viewOwnerHandler} onDelete={deleteOwnerHandler} />
        </TitledCard>
    </Fragment>
}

export default Owners;