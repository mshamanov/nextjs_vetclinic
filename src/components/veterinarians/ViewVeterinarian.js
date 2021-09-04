import TitledCard from "../ui/TitledCard";
import VeterinarianDetails from "./VeterinarianDetails";

const ViewVeterinarian = ({vet}) => {
    return <TitledCard title="Veterinarian Information">
        <VeterinarianDetails vet={vet} />
    </TitledCard>
}

export default ViewVeterinarian;