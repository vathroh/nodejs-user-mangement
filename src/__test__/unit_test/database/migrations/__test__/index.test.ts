import Migration from "@database/migrations/index";
import { up } from "@database/migrations/up";
import { down } from "@database/migrations/down";

jest.mock("@database/migrations/up");
jest.mock("@database/migrations/down");

describe("Migration", () => {
  let migration: Migration;

  beforeEach(() => {
    migration = new Migration();
    jest.clearAllMocks();
  });

  describe("up", () => {
    it("should call up and log success", async () => {
      (up as jest.Mock).mockResolvedValue(undefined);
      const consoleLogSpy = jest.spyOn(console, "log");

      await migration.up();

      expect(up).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith("Migration completed!");
    });

    it("should call up and log error", async () => {
      (up as jest.Mock).mockRejectedValue(new Error("Migration failed"));
      const consoleErrorSpy = jest.spyOn(console, "error");

      await migration.up();

      expect(up).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Migration failed:",
        new Error("Migration failed")
      );
    });
  });

  describe("down", () => {
    it("should call down and log success", async () => {
      (down as jest.Mock).mockResolvedValue(undefined);
      const consoleLogSpy = jest.spyOn(console, "log");

      await migration.down();

      expect(down).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith("Rollback completed!");
    });
  });
});
