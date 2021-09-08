import { useCallback, useEffect, useReducer, useState } from "react";

const reducer = (state, {type, payload}) => {
    switch (type) {
        case "SEND": {
            return {
                status: "pending",
                data: null,
                error: null
            }
        }

        case "SUCCESS": {
            return {
                status: "completed",
                data: payload,
                error: null
            }
        }

        case "ERROR": {
            return {
                status: "completed",
                data: null,
                error: payload
            }
        }
    }
}

const createAction = (type, payload) => {
    return {type, payload}
}

const useHttp = (startPending = false) => {
    const [onRequestComplete, setOnRequestComplete] = useState(null);
    const [state, dispatch] = useReducer(reducer, {
        status: startPending ? "pending" : null,
        data: null,
        error: null
    });

    useEffect(() => {
        const {status, error, data} = state;
        if (status === "completed" && onRequestComplete) {
            onRequestComplete(error, data);
            setOnRequestComplete(null);
        }
    }, [state, onRequestComplete]);

    const sendRequest = useCallback(async (url, method = "GET", body, onComplete) => {
        if (onComplete) {
            setOnRequestComplete(prev => onComplete);
        }

        const requestInit = {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            dispatch(createAction("SEND"));

            const response = await fetch(url, requestInit);

            if (!response.ok) {
                const data = await response.json();
                const message = data && data.errorMessage ? `${data.errorMessage}` : "Something went wrong!";
                const payload = {
                    errorMessage: `${message}`,
                    status: response.status,
                    statusText: response.statusText
                };
                dispatch(createAction("ERROR", payload));
            } else {
                const data = await response.json();
                dispatch(createAction("SUCCESS", data));
            }
        } catch (error) {
            dispatch(createAction("ERROR", {errorMessage: error.message}));
        }
    }, []);

    return {
        sendRequest,
        ...state
    }
}

export default useHttp;