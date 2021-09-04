import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import classes from "./Welcome.module.css";

const Welcome = () => {
    return <Fragment>
        <div className={classes.welcome}>
            <h1>Welcome back...</h1>
            <FontAwesomeIcon className={classes["paw-left"]} icon={["fas", "paw"]} size="9x" transform={"rotate-45"} />
        </div>
    </Fragment>
}

export default Welcome;