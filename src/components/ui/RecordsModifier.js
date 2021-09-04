import useForm from "../../hooks/use-form";
import TitledCard from "./TitledCard";

const RecordsModifier = ({title, controls, buttons}) => {
    const {form} = useForm({
        controls,
        buttons
    });

    return <div className="modifier">
        <TitledCard title={title}>
            {form}
        </TitledCard>
    </div>
}

export default RecordsModifier;