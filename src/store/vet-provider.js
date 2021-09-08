import VetContext from "./vet-context";

const VetProvider = ({children}) => {
    const store = {}

    return <VetContext.Provider value={store}>{children}</VetContext.Provider>
}

export default VetProvider;