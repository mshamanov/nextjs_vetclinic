import classes from "./ActionButton.module.css";

const ActionButton = ({type = "button", className, success, danger, medium, onClick, children}) => {
    const btnClasses = [classes.btn];

    if (success) {
        btnClasses.push(classes["btn-success"]);
    } else if (danger) {
        btnClasses.push(classes["btn-danger"]);
    }

    if (medium) {
        btnClasses.push(classes["btn-md"]);
    }

    if (className) {
        btnClasses.push(className);
    }

    return <button type={type} className={btnClasses.join(" ")} onClick={onClick}>{children}</button>
}

export default ActionButton;