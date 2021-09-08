import { fromISODateToLocaleString } from "../../../utils/common-utils";
import classes from "./PetInfoSection.module.css";
import PetInfoItem from "./PetInfoItem";

const PetInfoSection = ({pet}) => {
    return <ul className={classes["pet-info-list"]}>
        <PetInfoItem title="Name" value={pet.name} />
        <PetInfoItem title="Birth Date" value={fromISODateToLocaleString(pet.birthDate)} />
        <PetInfoItem title="Type" value={pet.type} />
    </ul>
}

export default PetInfoSection;