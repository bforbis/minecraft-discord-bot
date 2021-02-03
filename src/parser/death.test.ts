import parseLine from "./death";

describe("parseDeathMessage", () => {
  it("Should parse death messages", () => {
    expect(parseLine("player1?r drowned?r")).toEqual("**player1** drowned");
    expect(parseLine("player1?r died?r")).toEqual("**player1** died");
    expect(parseLine("player1?r withered away?r")).toEqual(
      "**player1** withered away"
    );
    expect(parseLine("player1?r burned to death?r")).toEqual(
      "**player1** burned to death"
    );
    expect(parseLine("player1?r was shot by ?rStymphalian Bird?r")).toEqual(
      "**player1** was shot by Stymphalian Bird"
    );
    expect(parseLine("player1?r was shot by ?rSkeleton?r")).toEqual(
      "**player1** was shot by Skeleton"
    );
    expect(parseLine("player1?r was crushed by a falling tree?r")).toEqual(
      "**player1** was crushed by a falling tree"
    );
    expect(
      parseLine(
        "player1?r was burnt to a crisp whilst fighting ?rAzure Volcan Lvl 2?r"
      )
    ).toEqual(
      "**player1** was burnt to a crisp whilst fighting Azure Volcan Lvl 2"
    );
  });
});
