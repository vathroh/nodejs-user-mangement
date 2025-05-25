type ErrorObject = Record<string, string[]>;
declare function errorsToFlatString(object: ErrorObject): string;
export default errorsToFlatString;
