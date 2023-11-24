import {CommonValidator, ValidationResult, Validator} from "@shared/lib";
import {TextField} from "@shared/types";
import {ChangeEvent, useCallback, useState} from "react";

export function useFormTextField(
    id: string,
    validators: Validator<string>[],
    init = ""
): TextField {
    const [value, setValue] = useState(init);
    const [error, setError] = useState<ValidationResult>(null);

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const newValue = event.target.value;

            setValue(newValue);
            setError(await CommonValidator.validate(newValue, validators));
        },
        [validators]
    );

    const handleBlur = useCallback(
        async () => {
            setError(await CommonValidator.validate(value, validators));
        },
        [value, validators]
    );

    const hasError = useCallback(
        async () => {
            const error = await CommonValidator.validate(value, validators);
            setError(error);

            return !!error;
        },
        [value, validators]
    );

    const setFieldError = (error: string | null) => {
        setError(error);
    }

    return {
        id,
        value,
        error,
        hasError,
        handleChange,
        handleBlur,
        setFieldError
    };
};