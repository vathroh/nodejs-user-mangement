import { down } from "./down";
import { up } from "./up";

export default class Migration {
  public up() {
    return up()
      .then(() => {
        console.log("Migration completed!");
      })
      .catch((error: Error) => {
        console.error("Migration failed:", error);
      });
  }

  public down() {
    down()
      .then(() => {
        console.log("Rollback completed!");
      })
      .catch((error: Error) => {
        console.error("Rollback failed:", error);
      });
  }
}
