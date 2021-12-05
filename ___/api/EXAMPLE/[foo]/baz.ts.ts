import { buildDynamicClient } from "../../../../lib/testing/buildDynamicApiClient";

import handler from "../../../../__no_ops/_________/[foo]/baz";

describe("We are testing dynamic route /api/EXAMPLE/[foo]/baz", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    const client = buildDynamicClient("/api/EXAMPLE/[foo]/bar", handler);
    // YOU MUST PASS A Record AS A BODY
    const result = await client(
      queryParameterValue,
      "post",
      { a: "data" },
      { "content-type": "application/json", cookie: "cookie stuff" }
    );

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
