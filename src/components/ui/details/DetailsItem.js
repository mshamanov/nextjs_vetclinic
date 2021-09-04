import classes from "./DetailsItem.module.css";

const DetailsItem = ({title, value}) => {
    return <li className={classes["details-item"]}>
        <div className={classes["details-label"]}>{title}</div>
        <div className={classes["details-data"]}>{value}</div>
    </li>
}

export default DetailsItem;