import { useCallback, useReducer } from "react";
import Modal from "../components/ui/modal/Modal";

const CONFIRM_MODAL = "confirm";
const ERROR_MODAL = "error";

const modalReducer = (state, {type, payload}) => {
    let modalOptions;

    if (type === CONFIRM_MODAL) {
        modalOptions = {
            buttons: [
                {
                    title: "Accept",
                    onClick: payload.onAccept,
                    success: true
                },
                {
                    title: "Cancel",
                    onClick: payload.onCancel,
                    danger: true
                }
            ],
            title: payload.title || "Confirmation",
            message: payload.message || "Are you sure?"
        }
    } else if (type === ERROR_MODAL) {
        modalOptions = {
            buttons: [
                {
                    title: "Ok",
                    onClick: payload.onAccept,
                }
            ],
            title: payload.title || "Error",
            message: payload.message || "Error occurred!",
            danger: true
        }
    } else if (type === "HIDDEN") {
        return {modal: null};
    }

    return {
        modal: <Modal {...modalOptions}><p>{modalOptions.message}</p></Modal>
    }
}

const useModal = () => {
    const [modalData, dispatch] = useReducer(modalReducer, {modal: null});

    const closeModalHandler = useCallback(() => {
        dispatch({type: "HIDDEN"})
    }, []);

    const showModal = useCallback((type, title, message, onAccept) => {
        dispatch({
            type,
            payload: {
                title,
                message,
                onAccept: () => {
                    if (onAccept) onAccept();
                    closeModalHandler();
                },
                onCancel: closeModalHandler
            }
        })
    }, [closeModalHandler]);

    const showError = useCallback((title, message, onAccept) => {
        showModal(ERROR_MODAL, title, message, onAccept);
    }, [showModal]);

    const showConfirm = useCallback((title, message, onAccept) => {
        showModal(CONFIRM_MODAL, title, message, onAccept);
    }, [showModal]);

    return {
        modal: modalData.modal,
        showError,
        showConfirm
    }
}

export default useModal;