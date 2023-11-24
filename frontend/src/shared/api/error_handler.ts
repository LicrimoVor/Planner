
export type ResponseErrorData = {
    [index: string]: string;
}

export class ResponseErrorHandler {
    public data: ResponseErrorData;

    constructor(data: ResponseErrorData) {
        this.data = data;
    }
}
