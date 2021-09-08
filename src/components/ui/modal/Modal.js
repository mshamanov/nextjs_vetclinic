import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ActionButton from "../ActionButton";
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

function ModalOverlay({children, title = "Confirmation", className, success, danger, buttons}) {
    const titleClasses = [classes["modal-title"]];
    const modalClasses = [classes["modal"]];

    if (success) {
        titleClasses.push(classes["modal-success"]);
    } else if (danger) {
        titleClasses.push(classes["modal-danger"]);
    }

    if (className) {
        modalClasses.push(className);
    }

    const buttonsContent = buttons.map(({title, onClick, ...rest}) => <ActionButton key={`btn-${title.toLowerCase()}`}
                                                                                   medium
                                                                                   onClick={onClick} {...rest}>{title}</ActionButton>);

    return (
        <div className={modalClasses.join(" ")}>
            <div className={titleClasses.join(" ")}>
                <h1 className="title">{title}</h1>
            </div>
            <div className={classes["modal-content"]}>
                {children}
            </div>
            <div className={classes["modal-actions"]}>
                {buttonsContent}
            </div>
        </div>
    );
}

function Modal(props) {
    return <ClientModal selector="#overlays">
        <Fragment>
            <Backdrop onClick={props.onCancel} />
            <ModalOverlay title={props.title}
                          className={props.className}
                          success={props.success}
                          danger={props.danger}
                          buttons={props.buttons}>
                {props.children}
            </ModalOverlay>
        </Fragment>
    </ClientModal>
}

export default Modal;
