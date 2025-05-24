type ErrorObject = Record<string, string[]>;

function errorsToFlatString(object: ErrorObject): string {
  return Object.entries(object)
    .map(([key, messages]) => `${key}: ${(messages as string[]).join(", ")}`)
    .join("\n");
}

export default errorsToFlatString;
