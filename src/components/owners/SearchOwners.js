import { useRouter } from "next/router";
import { useRef } from "react";
import ActionButton from "../ui/ActionButton";
import Actions from "../ui/Actions";
import TitledCard from "../ui/TitledCard";
import classes from "./SearchOwner.module.css";

const SearchOwners = () => {
    const router = useRouter();
    const searchRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const searchValue = `${searchRef.current.value}`;
        router.push(`${router.pathname}/search/${searchValue}`);
    }

    const addOwnerHandler = () => {
        router.push(`/owners/add`);
    }

    return <div className={classes["search"]}>
        <TitledCard title="Find Owner">
            <form onSubmit={submitHandler}>
                <div className={`input-group ${classes["search-group"]}`}>
                    <input id="search" name="search" type="text" ref={searchRef} placeholder="Search..." />
                    <ActionButton type="submit" medium success>Search</ActionButton>
                </div>
            </form>
        </TitledCard>
        <Actions className={classes.actions}>
            <ActionButton medium onClick={addOwnerHandler}>Add New Owner</ActionButton>
        </Actions>
    </div>
}

export default SearchOwners;