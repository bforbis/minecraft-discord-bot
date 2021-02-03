import advancementParser from "./advancement";

describe("isPlayerAdvancementLine", () => {
  it("Should detect player connection lines", () => {
    expect(advancementParser("?eplayer1?r?e joined the game?r")).toEqual(
      undefined
    );
    expect(advancementParser("?eplayer1?r?e left the game?r")).toEqual(
      undefined
    );
    expect(
      advancementParser(
        "player1?r has made the advancement ?r?a[?r?aNot Today, Thank You?r?a]?r"
      )
    ).toEqual(
      "**player1** has made the advancement [**Not Today, Thank You**]"
    );
  });
});
