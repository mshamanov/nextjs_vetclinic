import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import classes from "./Title.module.css";

const Title = () => {
    return <Fragment>

        <div className={classes["title-wrapper"]}>
            <FontAwesomeIcon icon={["fas", "cat"]} size="2x" transform={"up-1"} />
            <h1 className="title"><span className={classes.bold}>Vet</span> Clinic</h1>
        </div>
    </Fragment>
}

export default Title;