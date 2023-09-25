import * as tf from '@tensorflow/tfjs';


export const buildModel = (chars: Set<string>) => {
  const model = tf.sequential();

  model.add(tf.layers.embedding({ inputDim: chars.size, outputDim: 64, inputLength: 20 }));
  model.add(tf.layers.lstm({ units: 128, returnSequences: false }));
  model.add(tf.layers.dense({ units: chars.size, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: [ 'accuracy' ]
  });

  return model;
}
