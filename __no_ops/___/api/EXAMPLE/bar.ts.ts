import { buildDynamicClient } from "../../../../lib/testing/buildDynamicApiClient";

import handler from "../../../_________/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    const client = buildDynamicClient("/api/EXAMPLE/[bar]", handler);

    const result = await client(queryParameterValue, "get");

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();

    expect(result.body).toBeInstanceOf(Array);

    expect(result.body).toHaveLength(2);
  });
});
