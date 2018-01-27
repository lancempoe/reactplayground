import {Layer, Network} from 'synaptic';

var inputLayer = new Layer(10); //height, reach, l/r, age, rank
var hiddenLayer1 = new Layer(15);
var outputLayer = new Layer(1); // win/loss
var myNetwork;
var learningRate = 0.3;

function runHistoricalFight(stats, won) {
  myNetwork.activate(stats);
  myNetwork.propagate(learningRate, won);
}

//run 20000 training runs to learn the solution //
function trainingRun(){
  for (var i = 0; i < 20000; i++) {
    // 0,0 => 0
    runHistoricalFight([29, 28, 165, 171, 157, 175, 1, 1, 2, 1], [0]);
    runHistoricalFight([32, 29, 163, 168, 165, 173, 0, 1, 16, 1], [0]);
    runHistoricalFight([30, 35, 177, 168, 180, 178, 0, 1, 70, 216], [1]);
    runHistoricalFight([26, 27, 178, 180, 177, 185, 0, 1, 7, 342], [1]);
    runHistoricalFight([20, 29, 187, 174, 196, 173, 1, 1, 16, 240], [1]);
    runHistoricalFight([27, 22, 180, 171, 185, 175, 0, 1, 38, 362], [1]);
    runHistoricalFight([31,29,168,158,171,166,1,1, 2,5], [0]);
    //age, age, height,height, reach, reach, l/r, l/r, rank, rank
  }
}

function analizeFight(data) {
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

  it('Fight 1', () => {
    expect(analizeFight([27,39,180,178,184,180,1,1, 6,20])).toEqual(0);
  });
  it('Fight 2', () => {
    expect(analizeFight([25,23,173,173,168,185,1,1,24,119])).toEqual(0);
  });
  it('Fight 3', () => {
    expect(analizeFight([29,30,175,173,183,185,1,0,43,331])).toEqual(0);
  });
  //age, age, height,height, reach, reach, l/r, l/r, rank, rank
  it('Fight 4', () => {
    expect(analizeFight([26,24,161,161,166,162,1,1,18,4])).toEqual(1);
  });
});
