import { Response } from "express";
export type SystemData = {
    status?: number;
    message?: string;
    error?: string;
} & Record<string, unknown>;
export declare class ApiResponse<TData extends Record<string, unknown> | Record<string, unknown>[] | null = null, TMeta extends Record<string, unknown> = Record<string, unknown>> {
    private data;
    private metadata;
    private system;
    constructor(data?: TData, metadata?: TMeta, system?: SystemData);
    setData(data: TData): this;
    setMetadata(metadata: TMeta): this;
    setSystem(data: SystemData): this;
    setError(status: number, message: string, error?: Error | string): this;
    build(): {
        data?: TData;
        metadata?: TMeta;
        system: SystemData;
    };
    send(res: Response): Response<any, Record<string, any>>;
}
