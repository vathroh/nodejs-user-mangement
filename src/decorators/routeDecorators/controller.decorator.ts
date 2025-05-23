import MetadataKeys from "../../types/metadata-keys";

const Controller =
  (basePath: string): ClassDecorator =>
  (target) =>
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);

export default Controller;
