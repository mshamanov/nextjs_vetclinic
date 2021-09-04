import { useCallback, useRef, useState } from "react";
import Modal from "../components/ui/Modal";

const useModal = () => {
    const [active, setActive] = useState(false);

    const backdropClickHandler = useCallback(() => {
        setActive(false);
    }, []);

    const modalTitle = useRef();
    const modalMessage = useRef();
    const onConfirm = useRef();

    const modal = active ?
        <Modal title={modalTitle.current} onConfirm={onConfirm.current} onBackdropClick={backdropClickHandler}>
            <p>{modalMessage.current}</p>
        </Modal> : null;

    const showModal = useCallback((title = "Confirmation", message = "Are you sure?", onConfirmCallback) => {
        function onConfirmHandler() {
            onConfirmCallback();
            setActive(false);
        }

        modalTitle.current = title;
        modalMessage.current = message;
        onConfirm.current = onConfirmHandler;

        setActive(true);
    }, []);

    return [
        modal,
        showModal
    ]
}

export default useModal;