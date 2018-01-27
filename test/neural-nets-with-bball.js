import {Layer, Network} from 'synaptic';

var inputLayer = new Layer(10); //height, reach, l/r, age, rank
var hiddenLayer1 = new Layer(15);
var outputLayer = new Layer(1); // win/loss
var myNetwork;
var learningRate = 0.3;

function runHistoricalMatch(stats, won) {
  myNetwork.activate(stats);
  myNetwork.propagate(learningRate, won);
}

//run 20000 training runs to learn the solution //
function trainingRun(){
  for (var i = 0; i < 20000; i++) {
    // 0,0 => 0
    runHistoricalMatch([19,10,135,449,153,18,12,59,555,178], [0]);
    runHistoricalMatch([25,3,419,562,197,19,10,135,449,153], [0]);
    runHistoricalMatch([23,6,252,582,203,18,11,197,365,116], [1]);
    runHistoricalMatch([21,8,137,494,186,18,12,132,675,239], [0]);
    runHistoricalMatch([23,    7  ,   215  ,  654  ,  233  ,  22   , 9   ,  276   , 675  ,  257 ], [1]);
    runHistoricalMatch([24,    6  ,   330  ,  569  ,  224  ,  20   , 10  ,  46    , 464  ,  155 ], [0]);
    runHistoricalMatch([24,    5  ,   188  ,  605  ,  218  ,  22   , 9   ,  256   , 568  ,  206 ], [1]);
    runHistoricalMatch([22,    7  ,   349  ,  504  ,  181  ,  25   , 4   ,  4     , 528  ,  177 ], [0]);
    runHistoricalMatch([17,    11 ,   120  ,  556  ,  178  ,  20   , 12  ,  113   , 692  ,  241 ], [1]);
    //win,loss, totaldiff, 3point attp, 3point made, repead
  }
}

function analizeMatch(data) {
  return Math.round(myNetwork.activate(data));
}

describe("Forecasts", () => {
  beforeEach(() => {
    inputLayer.project(hiddenLayer1);
    hiddenLayer1.project(outputLayer);

    myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayer1], //can be multiple layers
      output: outputLayer
    });
    trainingRun();
  });

  it('Game 1', () => {
    expect(analizeMatch([25,4,323,428,154,23,5,300,427,162])).toEqual(1);
  });
  it('Game 2', () => {
    expect(analizeMatch([20,9,189,376,141,22,5,291,590,242])).toEqual(0);
  });
});
