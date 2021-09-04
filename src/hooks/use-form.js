import { useRouter } from "next/router";
import { useRef } from "react";
import ActionButton from "../components/ui/ActionButton";

const useForm = (props) => {
    const router = useRouter();
    const formRef = useRef();

    let buttonOptions = {
        submit: {
            onSubmit: () => {
            },
            show: true,
            value: "Save"
        },
        reset: {
            onReset: () => formRef.current.reset(),
            show: true,
            value: "Reset"
        },
        cancel: {
            onCancel: () => router.back(),
            show: true,
            value: "Cancel"
        }
    }

    if (props.buttons) {
        Object.keys(props.buttons).forEach(key => {
            if (buttonOptions.hasOwnProperty(key)) {
                buttonOptions[key] = {
                    ...buttonOptions[key],
                    ...props.buttons[key]
                };
            }
        })
    }

    const submitHandler = (event) => {
        const values = getFormValues();
        buttonOptions.submit.onSubmit(event, values);
    }

    const submitBtn = <ActionButton type="submit" medium success>{buttonOptions.submit.value}</ActionButton>;
    const resetBtn = <ActionButton medium
                                   onClick={buttonOptions.reset.onReset}>{buttonOptions.reset.value}</ActionButton>;
    const cancelBtn = <ActionButton medium
                                    onClick={buttonOptions.cancel.onCancel}>{buttonOptions.cancel.value}</ActionButton>;

    const formControls = Object.keys(props.controls).map(id => {
        const {name, label, type, defaultValue, disabled, required, ...rest} = props.controls[id];

        return <div key={id} className="input-group">
            <label htmlFor={id}>{label || name || id}</label>
            <input id={id} name={name || id} type={type || "text"} required={required} disabled={disabled}
                className={disabled && "disabled"} defaultValue={defaultValue} {...rest} />
        </div>
    });

    const form = <form className="form" ref={formRef} onSubmit={submitHandler}>
        {formControls}
        <div className="actions">
            {buttonOptions.submit.show && submitBtn}
            {buttonOptions.reset.show && resetBtn}
            {buttonOptions.cancel.show && cancelBtn}
        </div>
    </form>

    const getFormValues = () => Object.values(formRef.current.elements).reduce((acc, formValue) => {
        if (formValue.type !== "submit" && formValue.type !== "button") {
            acc[formValue.name] = formValue.value;
        }
        return acc
    }, {});

    return {form, getFormValues, formRef}
}

export default useForm;