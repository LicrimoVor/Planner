import {CommonValidator, ValidationResult, Validator} from "@shared/lib";
import {ImageField} from "@shared/types";
import {ChangeEvent, useCallback, useState} from "react";

export function useFormImageField(
    id: string,
    validators: Validator<File>[],
    init: string | null = null
): ImageField {
    const [value, setValue] = useState<string | null>(init);
    const [error, setError] = useState<ValidationResult>(null);

    const handleChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.item(0);
            if(!file) {
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                setValue(reader.result as string);
                setError(await CommonValidator.validate(file, validators));
            }
        },
        [validators]
    );

    const hasError = useCallback(
        async () => {
            // const error = value ? await CommonValidator.validate(validators) : null;
            const error = null;
            setError(error);

            return !!error;
        },
        []
    );

    return {
        id,
        value,
        error,
        hasError,
        handleChange,
    };
};