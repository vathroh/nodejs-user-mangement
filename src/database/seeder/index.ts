import { seed } from "./seed";

export default class Seeder {
  public seed() {
    return seed()
      .then(() => {
        console.log("Seeding completed!");
      })
      .catch((error: Error) => {
        console.error("Seeding failed:", error);
      });
  }
}
