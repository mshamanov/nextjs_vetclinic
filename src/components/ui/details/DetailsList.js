import DetailsItem from "./DetailsItem";
import classes from "./DetailsList.module.css";

const DetailsList = ({list}) => {
    const content = list.map(item => <DetailsItem key={item.key} title={item.key} value={item.value} />)

    return <ul className={classes["details-list"]}>
        {content}
    </ul>
}

export default DetailsList;