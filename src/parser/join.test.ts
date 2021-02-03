import parseLine from "./join";

describe("join", () => {
  it("Should detect player connection lines", () => {
    expect(parseLine("?eplayer1?r?e joined the game?r")).toEqual(
      "**player1** joined the game"
    );
    expect(parseLine("?eplayer1?r?e left the game?r")).toEqual(
      "**player1** left the game"
    );
    expect(parseLine("player1?r was slain by ?rFeradon Lvl 2?r")).toEqual(
      undefined
    );
  });
});
