import classes from "./PetDetailsInfoItem.module.css";

const PetDetailsInfoItem = ({title, value}) => {
    return <li className={classes["pet-info-item"]}>
        <div className={classes["pet-info-label"]}>{title}</div>
        <div className={classes["pet-info-data"]}>{value}</div>
    </li>
}

export default PetDetailsInfoItem;