import Card from "./Card";
import classes from "./TitledCard.module.css";

const TitledCard = ({title, children, className}) => {
    return <div className={classes["titled-card"]}>
        <h1 className={`title ${classes["title"]}`}>{title}</h1>
        <Card className={className}>{children}</Card>
    </div>
}

export default TitledCard;