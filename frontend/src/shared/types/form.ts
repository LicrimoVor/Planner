import {ChangeEvent} from "react";

export type DefaultField = {
  id: string;
  value: string;
  error: string | null;
  hasError: () => Promise<boolean>;
  setFieldError: (error: string | null) => void;
};

export type TextField = DefaultField & {
    handleChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleBlur: () => void;
};

export type ImageField = Omit<DefaultField, "value" | "setFieldError"> & {
    value: string | null;
    handleChange: (
        e: ChangeEvent<HTMLInputElement>
    ) => void;
};