import { Response } from "express";

// Ubah Data dan Metadata jadi generic
export type SystemData = {
  status?: number;
  message?: string;
  error?: string;
} & Record<string, unknown>; // ✅ Ganti any → unknown

export class ApiResponse<
  TData extends
    | Record<string, unknown>
    | Record<string, unknown>[]
    | null = null,
  TMeta extends Record<string, unknown> = Record<string, unknown>,
> {
  private data: TData = null as TData;
  private metadata: TMeta = {} as TMeta;
  private system: SystemData = {
    status: 200,
    message: "OK",
  };

  constructor(
    data?: TData,
    metadata?: TMeta,
    system: SystemData = {
      status: 200,
      message: "OK",
    },
  ) {
    this.data = data ?? (null as TData);
    this.metadata = metadata ?? ({} as TMeta);
    delete this.system.error;
    Object.assign(this.system, system);
  }

  setData(data: TData): this {
    this.data = data;
    return this;
  }

  setMetadata(metadata: TMeta): this {
    this.metadata = metadata;
    return this;
  }

  setSystem(data: SystemData): this {
    delete this.system.error;
    Object.assign(this.system, {
      ...data,
      status: data.status ?? 200,
      message: data.message ?? "OK",
    });
    return this;
  }

  setError(status: number, message: string, error?: Error | string): this {
    this.system.status = status;
    this.system.message = message;
    this.system.error =
      typeof error === "string" ? error : error?.message || error?.toString();
    return this;
  }

  build(): {
    data?: TData;
    metadata?: TMeta;
    system: SystemData;
  } {
    const response: {
      data?: TData;
      metadata?: TMeta;
      system: SystemData;
    } = {
      system: this.system,
    };

    if (this.data !== null) {
      response.data = this.data;
    }

    if (Object.keys(this.metadata).length > 0) {
      response.metadata = this.metadata;
    }

    return response;
  }

  send(res: Response) {
    const response = this.build();
    return res.status(this.system.status ?? 200).json(response);
  }
}
