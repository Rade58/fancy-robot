import { testClient } from "../../../lib/testing/apiClient";
import handler from "../../../pages/api/foo";

describe("Testing GET for /api/foo", () => {
  it("returns 200 if everything is right", async () => {
    const result = await testClient(handler).get("/api/foo");

    expect(result.status).toEqual(200);

    expect(result.text).toEqual("hello 666");
  });
});
