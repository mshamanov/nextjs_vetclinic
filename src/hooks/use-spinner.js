import LoadingSpinner from "../components/ui/LoadingSpinner";

const useSpinner = (predicate) => {
    return predicate ? <LoadingSpinner /> : null;
}

export default useSpinner;