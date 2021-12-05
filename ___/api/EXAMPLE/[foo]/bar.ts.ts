import { buildDynamicClient } from "../../../../lib/testing/buildDynamicApiClient";

import handler from "../../../../__no_ops/_________/[foo]/bar";

describe("We are testing dynamic route /api/EXAMPLE/[foo]/bar", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    const client = buildDynamicClient("/api/EXAMPLE/[foo]/bar", handler);
    const result = await client(queryParameterValue, "get");

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
