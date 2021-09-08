import PetVisitItem from "./PetVisitItem";
import classes from "./PetVisitsSection.module.css";

const PetVisitsSection = ({owner, pet, onVisitDelete}) => {
    const visitsContent = pet.visits && pet.visits.length > 0 ? pet.visits.map(visit => <PetVisitItem key={visit.id}
                                                                                                      owner={owner}
                                                                                                      pet={pet}
                                                                                                      visit={visit}
                                                                                                      onVisitDelete={onVisitDelete} />) :
        <p className={classes["no-visits"]}>No visits</p>;

    return <ul className={classes["pet-visits-list"]}>
        <li className={classes["pet-visits-header"]}>
            <div className={`${classes["pet-visits-label"]} ${classes["pet-visits-label-date"]}`}>Date</div>
            <div className={`${classes["pet-visits-label"]} ${classes["pet-visits-label-description"]}`}>Description
            </div>
            <div className={`${classes["pet-visits-label"]} ${classes["pet-visits-label-actions"]}`} />
        </li>
        {visitsContent}
    </ul>
}

export default PetVisitsSection;