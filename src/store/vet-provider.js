import { useState } from "react";
import Owner from "../models/Owner";
import Pet from "../models/Pet";
import Vet from "../models/Vet";
import Visit from "../models/Visit";
import VetContext from "./vet-context";

const DUMMY_OWNERS = [
    new Owner(
        "Dmitry",
        "Lesnov",
        "Moscow, Lenina str. 55, ap. 7",
        "(495) 495-123-33",
        "lesnov@yahoo.com",
        new Pet("Tom", new Date(2020, 1, 20), "cat", null,
            new Visit(new Date(2021, 0, 1), "annual examination"),
            new Visit(new Date(), "mandatory vaccine injection")
        )
    ),
    new Owner(
        "Irina",
        "Ivanova",
        "Moscow, Lenina str. 55, ap. 7",
        "(495) 495-123-33",
        "ivanova@mail.ru"
    ),
    new Owner(
        "Andrei",
        "Kirilov",
        "Moscow, Stoyanova str. 12, ap. 89",
        "(495) 495-123-33",
        "kirilov@outlook.com"
    ),
    new Owner(
        "Evgeny",
        "Sharapov",
        "Moscow, Kremlin str. 35, ap. 10",
        "(495) 495-789-12",
        "sharapov@gmail.com"
    ),
];

const DUMMY_VETS = [
    new Vet(
        "Irina",
        "Novikova",
        "Moscow, Lermontova str. 15, ap. 9",
        "(495) 495-321-54",
        "novikova@mail.ru",
        ...["therapist"]
    ),
    new Vet(
        "Igor",
        "Bahvalov",
        "Moscow, Bolshaya str. 12, ap. 3",
        "(495) 495-456-78",
        "bahvalov@mail.ru",
        ...["therapist", "surgeon"]
    ),
    new Vet(
        "Anna",
        "Vernova",
        "Moscow, Lomonosov str. 3, ap. 7",
        "(495) 495-123-45",
        "vernova@mail.ru",
        ...["administrator", "therapist"]
    )
];

const VetProvider = ({children}) => {
    const [owners, setOwners] = useState(DUMMY_OWNERS);
    const [vets, setVets] = useState(DUMMY_VETS);

    const addOwner = (newOwner) => {
        const existingIdx = owners.findIndex(owner => owner.id === newOwner.id);

        if (existingIdx === -1) {
            setOwners(prevState => {
                return [...prevState, newOwner];
            });
        } else {
            setOwners(prevState => {
                const updatedOwners = [...prevState];
                newOwner.pets.forEach(pet => {

                    pet.owner = newOwner;
                    pet.visits.forEach(visit => {
                        visit.pet = pet;
                    });
                });
                updatedOwners[existingIdx] = newOwner;
                return updatedOwners;
            });
        }
    }

    const addPet = (newPet) => {
        const existingOwner = owners.find(owner => owner.id === newPet.owner.id);

        if (!existingOwner) {
            return;
        }

        const updatedOwner = existingOwner.clone();
        const existingPetIdx = updatedOwner.pets.findIndex(pet => pet.id === newPet.id);

        if (existingPetIdx === -1) {
            updatedOwner.pets.push(newPet);
        } else {
            updatedOwner.pets[existingPetIdx] = newPet;
        }

        addOwner(updatedOwner);
    }

    const removeOwner = (ownerId) => {
        setOwners(prevState => {
            return prevState.filter(owner => owner.id !== ownerId);
        })
    };

    const removePet = (pet) => {
        const existingIdx = owners.findIndex(owner => owner.id === pet.owner.id);

        if (existingIdx === -1) {
            return;
        }

        setOwners(prevState => {
            const updatedOwners = [...prevState];
            updatedOwners[existingIdx].pets = updatedOwners[existingIdx].pets.filter(p => p.id !== pet.id);
            return updatedOwners;
        });
    };

    const addVisit = (newVisit) => {
        const existingOwner = owners.find(owner => owner.id === newVisit.pet.owner.id);

        if (!existingOwner) {
            return;
        }

        const existingPetIdx = existingOwner.pets.findIndex(pet => pet.id === newVisit.pet.id);

        if (existingPetIdx === -1) {
            return;
        }

        const updatedOwner = existingOwner.clone();
        const existingVisitIdx = updatedOwner.pets[existingPetIdx].visits.findIndex(visit => visit.id === newVisit.id);

        if (existingVisitIdx === -1) {
            updatedOwner.pets[existingPetIdx].visits.push(newVisit);
        } else {
            updatedOwner.pets[existingPetIdx].visits[existingVisitIdx] = newVisit;
        }

        addOwner(updatedOwner);
    }

    const removeVisit = (visit) => {
        const existingIdx = owners.findIndex(owner => owner.id === visit.pet.owner.id);

        if (existingIdx === -1) {
            return;
        }

        const existingPetIdx = owners[existingIdx].pets.findIndex(pet => pet.id === visit.pet.id);

        if (existingPetIdx === -1) {
            return;
        }

        setOwners(prevState => {
            const updatedOwners = [...prevState];
            updatedOwners[existingIdx].pets[existingPetIdx].visits = updatedOwners[existingIdx].pets[existingPetIdx].visits.filter(v => v.id !== visit.id);
            return updatedOwners;
        });
    }

    const addVet = (newVet) => {
        const existingIdx = vets.findIndex(vet => vet.id === newVet.id);

        if (existingIdx === -1) {
            setVets(prevState => {
                return [...prevState, newVet];
            });
        } else {
            setVets(prevState => {
                const updatedVets = [...prevState];
                updatedVets[existingIdx] = newVet;
                return updatedVets;
            });
        }
    }

    const removeVet = (vetId) => {
        setVets(prevState => {
            return prevState.filter(vet => vet.id !== vetId);
        })
    };

    const store = {
        owners,
        vets,
        addOwner,
        removeOwner,
        addPet,
        removePet,
        addVisit,
        removeVisit,
        addVet,
        removeVet
    }

    return <VetContext.Provider value={store}>{children}</VetContext.Provider>
}

export default VetProvider;