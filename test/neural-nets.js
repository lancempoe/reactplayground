import { Layer, Network } from 'synaptic';
import _ from 'lodash';

var inputLayer = new Layer(2); //1s and 0s
var hiddenLayer1 = new Layer(6);
var outputLayer = new Layer(3); //[0,1,0]

//Connect the input to the hidden layer
inputLayer.project(hiddenLayer1);
hiddenLayer1.project(outputLayer);
//hiddenLayer2.project(outputLayer);

//hidden goes to outputLayer
var myNetwork = new Network({
 input: inputLayer,
 hidden: [hiddenLayer1], //can be multiple layers
 output: outputLayer
});

//training
var learningRate = 0.3;

//run 20000 training runs to learn the solution //
function trainingRun(){
  for (var i = 0; i < 20000; i++) {
    // 0,0 => 0
    myNetwork.activate([0,0]);
    myNetwork.propagate(learningRate, [0, 1, 0]);
    // 0,1 => 1
    myNetwork.activate([0,1]);
    myNetwork.propagate(learningRate, [0, 0, 1]);
    // 1,0 => 1
    myNetwork.activate([1,0]);
    myNetwork.propagate(learningRate, [1, 0, 0]);
    // 1,1 => 0
    myNetwork.activate([1,1]);
    myNetwork.propagate(learningRate, [0, 1, 0]);

    myNetwork.activate([9,1]);
    myNetwork.propagate(learningRate, [1, 0, 0]);

    myNetwork.activate([1,3]);
    myNetwork.propagate(learningRate, [0, 0, 1]);

    myNetwork.activate([3,2]);
    myNetwork.propagate(learningRate, [1, 0, 0]);

    myNetwork.activate([8,9]);
    myNetwork.propagate(learningRate, [0, 0, 1]);
  }
}


//running after training
function showResults(){
  trainingRun();
  checkResults([5,4], [1,0,0]);
  checkResults([0,3], [0,0,1]);
  checkResults([2,2], [0,1,0]);
  checkResults([0,0], [0,1,0]);
  checkResults([4,5], [0,0,1]);
  checkResults([9,10], [0,0,1]);

}

function checkResults(score, expected) {
  console.log(score, _.isEqual(expected, myNetwork.activate(score).map(x => Math.round(x))))
}

showResults();
