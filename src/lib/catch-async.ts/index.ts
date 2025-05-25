import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFn<
  Params = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string | string[]>,
  Return = void,
> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<Return>;

const catchAsync = <
  Params = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string | string[]>,
  Return = void,
>(
  fn: AsyncFn<Params, ResBody, ReqBody, ReqQuery, Return>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
