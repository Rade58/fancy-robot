import buildDynamicRoute from "../buildDynamicRoute";

describe("building dynamic route for case of nextjs [] template", () => {
  it("shuld return valid route with value pssed in", () => {
    const result = buildDynamicRoute("/api/something/[foo]", "barbaz");

    const result2 = buildDynamicRoute("/api/[foo]/bam", "barbaz");

    expect(result).toEqual({
      parsedRoute: "/api/something/barbaz",
      bracketedName: "foo",
      val: "barbaz",
    });

    expect(result2).toEqual({
      parsedRoute: "/api/barbaz/bam",
      bracketedName: "foo",
      val: "barbaz",
    });

    // console.log({ result, result2 });

    expect(() => {
      buildDynamicRoute("/api/something/[foo", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/[foo/bam", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/something]/[foo", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/foo]/bam", "barbaz");
    }).toThrowError();

    expect(() => {
      buildDynamicRoute("/api/foo/bam", "barbaz");
    }).toThrowError();
  });
});
