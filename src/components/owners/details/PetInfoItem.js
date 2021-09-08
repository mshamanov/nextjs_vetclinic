import classes from "./PetInfoItem.module.css";

const PetInfoItem = ({title, value}) => {
    return <li className={classes["pet-info-item"]}>
        <div className={classes["pet-info-label"]}>{title}</div>
        <div className={classes["pet-info-data"]}>{value}</div>
    </li>
}

export default PetInfoItem;