import PetDetailsVisitItem from "./PetDetailsVisitItem";
import classes from "./PetDetailsVisits.module.css";

const PetDetailsVisits = ({visits}) => {
    const visitsContent = visits && visits.length > 0 ? visits.map(visit => <PetDetailsVisitItem key={visit.id}
                                                                                                 visit={visit} />) :
        <p className={classes["no-visits"]}>No visits</p>;

    return <ul className={classes["pet-visits-list"]}>
        <li className={classes["pet-visits-header"]}>
            <div className={`${classes["pet-visits-label"]} ${classes["pet-visits-label-date"]}`}>Date</div>
            <div className={`${classes["pet-visits-label"]} ${classes["pet-visits-label-description"]}`}>Description</div>
            <div className={`${classes["pet-visits-label"]} ${classes["pet-visits-label-actions"]}`} />
        </li>
        {visitsContent}
    </ul>
}

export default PetDetailsVisits;