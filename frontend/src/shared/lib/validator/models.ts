export type ValidationResult = string | null;
export type Validator<T> = (params: T) => Promise<ValidationResult>;
export type GetValidator<Options, Params> = (options?: Options) => Validator<Params>;