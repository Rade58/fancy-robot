import { caclPercents } from "../calculateOrderPrice";

describe("precentage stuff", () => {
  it("should calculate percentages correctly", () => {
    const result = caclPercents(25, 100);
    const result1 = caclPercents(50, 200);

    expect(result).toEqual(25);
    expect(result1).toEqual(100);
  });
});
