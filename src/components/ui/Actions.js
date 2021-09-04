const Actions = ({className, children}) => {
    const classNames = ["actions"];

    if (className) {
        classNames.push(className);
    }

    return <div className={classNames.join(" ")}>
        {children}
    </div>
}

export default Actions;