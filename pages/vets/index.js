import { useContext } from "react";
import Veterinarians from "../../src/components/veterinarians/Veterinarians";
import VetContext from "../../src/store/vet-context";

function VeterinariansPage() {
    const vetCtx = useContext(VetContext);

    return <Veterinarians vets={vetCtx.vets} />
}

export default VeterinariansPage;