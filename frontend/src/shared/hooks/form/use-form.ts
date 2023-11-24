import {DefaultField} from "@shared/types";
import {FormEventHandler, useState} from "react";
import {ResponseErrorHandler, ResponseErrorData} from "@shared/api";

export function useForm<Field extends DefaultField, Response, ResponseError>(props: {
    fields: Field[];
    apiCall: () => Promise<Response>;
    onSuccess?: (response: Response) => void;
    onFailure?: (error: ResponseError) => void;
    defaultError: ResponseError;
    defaultSuccessMessage?: string;
}): {
    isSending: boolean;
    sendingError: ResponseError;
    successMessage: string;
    hasFieldErrors: boolean;
    handleFormSubmit: FormEventHandler<HTMLFormElement>;
} {
    const {fields, apiCall, onSuccess, onFailure, defaultError, defaultSuccessMessage} = props;

    const [isSending, setIsSending] = useState(false);
    const [sendingError, setSendingError] = useState<ResponseError>(defaultError);
    const [successMessage, setSuccessMessage] = useState("");

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const errors = await Promise.all(fields.map(field => field.hasError()));
        const isFormValid = errors.every(error => !error);

        if(!isFormValid) return;

        setIsSending(true);
        setSendingError(defaultError);
        setSuccessMessage("");

        try {
            const response = await apiCall();
            !!defaultSuccessMessage && (setSuccessMessage(defaultSuccessMessage));
            onSuccess?.(response);
        }
        catch (error) {
            const message = (
                error instanceof Error ?
                    error.message :
                error instanceof ResponseErrorHandler ?
                    error.data :
                "Произошла ошибка при выполнении запроса"
            ) as ResponseError;

            if(error instanceof ResponseErrorHandler) {
                fields.forEach(field => {
                    field.setFieldError((message as ResponseErrorData)[field.id] || null);
                });
            }

            setSendingError(message);
            onFailure?.(message);
        }
        finally {
            setIsSending(false);
        }
    };

    const hasFieldErrors = fields.some(field => !!field.error);

    return {
        isSending,
        sendingError,
        successMessage,
        hasFieldErrors,
        handleFormSubmit
    };
};