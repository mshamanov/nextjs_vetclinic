import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ActionButton from "./ActionButton";
import classes from "./Modal.module.css";

export function ClientModal({children, selector}) {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector(selector)
        setMounted(true)
    }, [selector])

    return mounted ? createPortal(children, ref.current) : null;
}

function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClick} />;
}

function ModalOverlay({children, title = "Confirmation", className, success, danger, onConfirm, onBackdropClick}) {
    const modalClasses = [classes["modal-title"]];

    if (success) {
        modalClasses.push(classes["modal-success"]);
    } else if (danger) {
        modalClasses.push(classes["modal-danger"]);
    }

    if (className) {
        modalClasses.push(className);
    }

    return (
        <div className={classes.modal}>
            <div className={modalClasses.join(" ")}>
                <h1 className="title">{title}</h1>
            </div>
            <div className={classes["modal-content"]}>
                {children}
            </div>
            <div className={classes["modal-actions"]}>
                <ActionButton medium success onClick={onConfirm}>Confirm</ActionButton>
                <ActionButton medium danger onClick={onBackdropClick}>Cancel</ActionButton>
            </div>
        </div>
    );
}

function Modal(props) {
    return <ClientModal selector="#overlays">
        <Fragment>
            <Backdrop onClick={props.onBackdropClick} />
            <ModalOverlay {...props}>{props.children}</ModalOverlay>
        </Fragment>
    </ClientModal>
}

export default Modal;
