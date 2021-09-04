import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import classes from "./Navigation.module.css";

const Navigation = () => {
    return <ul className={classes.nav}>
        <Link href={"/"} passHref>
            <li><span><FontAwesomeIcon icon={["fas", "home"]} size="sm" /></span>Home</li>
        </Link>
        <Link href={"/owners"} passHref>
            <li><span><FontAwesomeIcon icon={["fas", "user"]} size="sm" /></span>Owners</li>
        </Link>
        <Link href={"/vets"} passHref>
            <li><span><FontAwesomeIcon icon={["fas", "user-md"]} size="sm" /></span>Veterinarians</li>
        </Link>
    </ul>
}

export default Navigation;