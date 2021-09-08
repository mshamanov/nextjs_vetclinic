import Modal from "./Modal";

const ConfirmModal = (props) => {
    const buttons = [
        {
            title: "Confirm",
            onClick: props.onConfirm,
            success: true
        },
        {
            title: "Cancel",
            onClick: props.onCancel,
            danger: true
        }
    ]
    return <Modal title="Confirmation"
                  className={props.className}
                  buttons={buttons}>{props.children}</Modal>
}

export default ConfirmModal;