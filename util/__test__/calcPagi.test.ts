import calcPagi from "../calcPagi";

describe("calculating pagination details", () => {
  it("should work properly", () => {
    // NOT ACCEPTING NEGATIVE CURRENT PAG NUMBER
    expect(() => calcPagi(-1, 16, 4, 70)).toThrowError(
      "current page number can't be a negative number"
    );
    // NUMBER OF PAGE EXCEEDED AMOUT OF PAGES
    expect(() => calcPagi(6, 16, 4, 70)).toThrow(
      "ordinl number of current page can not be higher than total numbe of pages"
    );

    // PICA
    // PICKED A TOO HIGH PAGE NUMBER FOR THE
    // SO NUMBER OF PRODUCTS OR NUMNER OF PRODUCTS PER PAGE
    // CAN'T ACCEPT THAT
    expect(() => calcPagi(4, 16, 4, 60)).toThrowError();

    // THESE I'LL INSPECT VISUALLY
    // IT WOULD BE TOO TIME CONSUMING TO DO OTHERVISE
    // const result0 = calcPagi(0, 16, 4, 70);
    // console.log("------------------------");
    // console.log(0);
    // console.log(JSON.stringify(result0, null, 2));
    // console.log("------------------------");
    // const result1 = calcPagi(1, 16, 4, 70);
    // console.log("------------------------");
    // console.log(1);
    // console.log(JSON.stringify(result1, null, 2));
    // console.log("------------------------");
    // const result2 = calcPagi(2, 16, 4, 70);
    // console.log("------------------------");
    // console.log(2);
    // console.log(JSON.stringify(result2, null, 2));
    // console.log("------------------------");
    // const result3 = calcPagi(3, 16, 4, 70);
    // console.log("------------------------");
    // console.log(3);
    // console.log(JSON.stringify(result3, null, 2));
    // console.log("------------------------");
    // const result4 = calcPagi(4, 16, 4, 70);
    // console.log("------------------------");
    // console.log(4);
    // console.log(JSON.stringify(result4, null, 2));
    // console.log("------------------------");
    // const result5 = calcPagi(5, 16, 4, 70);
    // console.log("------------------------");
    // console.log(5);
    // console.log(JSON.stringify(result5, null, 2));
    // console.log("------------------------");

    // console.log(calcPagi(12, 16, 5, 600));
    // console.log(calcPagi(12, 16, 6, 600));
    // console.log(calcPagi(12, 16, 4, 600));
    //
    // console.log(calcPagi(3, 16, 4, 70));
    // console.log(calcPagi(2, 16, 4, 70));
    // console.log(calcPagi(1, 16, 4, 70));
    // console.log(calcPagi(0, 16, 4, 70));
    //
    // console.log(calcPagi(1, 16, 4, 60));
    // console.log(calcPagi(3, 16, 4, 60));
    // console.log(calcPagi(2, 16, 4, 60));
    // console.log(calcPagi(0, 16, 4, 60));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("-------------0----------------");
    // console.log(calcPagi(0, 16, 4, 80));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("-------------1----------------");
    // console.log(calcPagi(1, 16, 4, 80));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("-------------2----------------");
    // console.log(calcPagi(2, 16, 4, 80));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("-------------3----------------");
    console.log(calcPagi(3, 16, 4, 80));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("-------------4----------------");
    // EDGE CASE (HAD TO DO CORRECTIONS)
    console.log(calcPagi(4, 16, 4, 80));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // error edge case cross the limit CASE (EXPECT ERROR) (TRUE I GOT ONE)
    // console.log("-------------5----------------");
    // console.log(calcPagi(5, 16, 4, 80));
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // console.log("------------------------");
    // ERROR
    // console.log("------------------------");
    // console.log("-------------6----------------");
    // console.log(calcPagi(6, 16, 4, 80));
    // EDGE CASE
    // console.log(calcPagi(6, 16, 4, 240));
  });

  // edge numbers you can test --> 80 , 240
});
