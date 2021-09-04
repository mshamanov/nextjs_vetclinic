import React from "react";

const VetContext = React.createContext({
    owners: [],
    addOwner: (newOwner) => {
    },
    removeOwner: (ownerId) => {
    },
    addPet: (newPet) => {
    },
    removePet: (pet) => {
    },
    addVisit: (newVisit) => {
    },
    removeVisit: (visit) => {
    },
    addVet: (newVet) => {
    },
    removeVet: (vetId) => {
    }
});

export default VetContext;