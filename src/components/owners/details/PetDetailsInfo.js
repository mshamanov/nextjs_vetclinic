import classes from "./PetDetailsInfo.module.css";
import PetDetailsInfoItem from "./PetDetailsInfoItem";

const PetDetailsInfo = ({pet}) => {
    return <ul className={classes["pet-info-list"]}>
        <PetDetailsInfoItem title="Name" value={pet.name} />
        <PetDetailsInfoItem title="Birth Date" value={pet.birthDateAsString} />
        <PetDetailsInfoItem title="Type" value={pet.type} />
    </ul>
}

export default PetDetailsInfo;