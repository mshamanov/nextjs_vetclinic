import { useEffect } from "react";
import useHttp from "./use-http";
import useModal from "./use-modal";
import useSpinner from "./use-spinner";

const useHttpRequest = () => {
    const {modal, showConfirm, showError} = useModal();
    const {sendRequest, error, status} = useHttp();
    const spinner = useSpinner(status === "pending");

    useEffect(() => {
        if (error) {
            showError("Error " + (error.status || ""), error.errorMessage);
        }
    }, [error, showError]);

    return {
        modal: {
            modalDialog: modal,
            showConfirm,
            showError
        },
        http: {
            sendRequest
        },
        spinner: {
            spinnerDialog: spinner
        }
    }
}

export default useHttpRequest;