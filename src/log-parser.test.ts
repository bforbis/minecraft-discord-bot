jest.mock('console');
import * as parser from './log-parser';

describe('processLine', () => {
  beforeEach(() => {
    jest.spyOn(console, 'debug').mockReturnValue(undefined);
  });
  it('Should process target lines', () => {
    expect(
      parser.processLine(
        '[22:05:09] [Server thread/INFO]: ?eplayer1?r?e joined the game?r'
      )
    ).toEqual('**player1** joined the game');
  });
  it('Should process target lines', () => {
    expect(
      parser.processLine(
        '[22:59:13] [Server thread/INFO]: player2?r was slain by ?rFeradon Lvl 2?r'
      )
    ).toEqual('**player2** was slain by Feradon Lvl 2');
  });
});

describe('parseLine', () => {
  it('Should parse line components', () => {
    expect(
      parser.parseLine(
        '[22:05:09] [Server thread/INFO]: ?eplayer1?r?e joined the game?r'
      )
    ).toMatchObject({
      time: '22:05:09',
      loglevel: 'INFO',
      line: '?eplayer1?r?e joined the game?r',
    });
  });
});
