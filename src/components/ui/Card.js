import classes from "./Card.module.css";

const Card = ({children, className}) => {
    const classNames = [classes.card];

    if (className) {
        classNames.push((className));
    }

    return <div className={classNames.join(" ")}>
        {children}
    </div>
}

export default Card;