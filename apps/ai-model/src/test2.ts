import * as tf from '@tensorflow/tfjs-node';

const sentences = [
  'Add a new user',
  'Guide me on adding a new user',
  'Add a new user by following these steps',
  'Execute the process to add a new user',
  'Add multiple users at once',
  'Bulk add users',
  'Guide me on adding users in bulk',
  'Add multiple users in one go by following these steps',
  'Filter users by \'new\' status',
  'Show me how to filter users by \'new\'',
  'Filter users by new status using these steps',
  'Filter users by new',
  'See the total number of active users',
  'Get the count of active users',
  'View the total active users by following these steps',
  'Display the total active user count',
  'Sort users by their last visited date',
  'Sort users by last visited',
  'Sort users by last visited date using these steps',
  'Sort users by last visited date',
  'Sort users by their created date',
  'Guide me on sorting users by created date',
  'Sort users by creation date using these steps',
  'Sort users by created date',
  'Edit a user\'s role',
  'Change a user\'s role',
  'Edit a user\'s role by following these steps',
  'Edit a user\'s role',
]
// // Flatten dataset
// const sentences = [];
// const labels = [];
// const labelToIndex = {};
// let index = 0;
// for (let label in data) {
//   labelToIndex[label] = index;
//   for (let sentence of data[label]) {
//     sentences.push(sentence);
//     labels.push(index);
//   }
//   index++;
// }

// Tokenization
const words = new Set();
sentences.forEach(sentence => {
  sentence.split(' ').forEach(word => {
    words.add(word.toLowerCase());
  });
});

const wordToIndex = {};
const indexToWord = {};
let idx = 1;
words.forEach((word: string) => {
  wordToIndex[word] = idx;
  indexToWord[idx] = word;
  idx++;
});


const trainX = [];
const trainY = [];

sentences.forEach(sentence => {
  const tokens = sentence.split(' ').map(word => wordToIndex[word.toLowerCase()]);
  for (let i = 0; i < tokens.length - 1; i++) {
    trainX.push(tokens.slice(0, i + 1));
    trainY.push(tokens[i + 1]);
  }
});

const maxLength = Math.max(...trainX.map(seq => seq.length));

const paddedTrainX = trainX.map(seq => {
  while (seq.length < maxLength) {
    seq.unshift(0);  // Add padding to the front
  }
  return seq;
});

const vocabSize = words.size + 10;

const oneHotTrainY: any = trainY.map(token => {
  const oneHot = Array(vocabSize).fill(0);
  oneHot[token - 1] = 1;
  return oneHot;
});

const reshapedTrainX = tf.tensor2d(paddedTrainX);
const tensorTrainY = tf.tensor2d(oneHotTrainY);

const model = tf.sequential();

model.add(tf.layers.embedding({ inputDim: vocabSize, outputDim: 128 }));
model.add(tf.layers.lstm({ units: 128, returnSequences: true }));
model.add(tf.layers.lstm({ units: 128 }));
model.add(tf.layers.dense({ units: vocabSize, activation: 'softmax' }));

model.compile({
  optimizer: 'adam',
  loss: 'categoricalCrossentropy',
  metrics: [ 'accuracy' ]
});


export const modelSummary = async () => {

  // console.log(model.layers[0].inputSpec[0].shape);
  model.summary()

  await model.fit(reshapedTrainX, tensorTrainY, {
    epochs: 100,
    batchSize: 16
  });

  model.summary()
}

const predictNextWord = (inputSequence) => {
  const predictions = model.predict(inputSequence);
  if (Array.isArray(predictions)) {
    return predictions.map(predict => predict.argMax(-1).dataSync()[0])
      .map(maxIndex => indexToWord[maxIndex]);
  } else {
    const maxIndex = predictions.argMax(-1).dataSync()[0];
    return indexToWord[maxIndex]; // Assuming you have a mapping from index to word
  }

}

const textToSequence = (inputText) => {
  return inputText.split(' ').map(word => {
    // If the word is in our vocabulary, return its corresponding index. Otherwise, handle it (e.g., return a special index or skip it).
    return wordToIndex[word.toLowerCase()] || -1;  // Here, -1 denotes an unknown word, but this can be adjusted based on your specific needs.
  }).filter(index => index !== -1);  // Filter out any unknown words (optional).
};

export const autoComplete = (inputText, num= 2) => {

  let currentText = inputText
  for(let i = 0; i < num; i++) {
    const inputSequence = textToSequence(currentText); // Convert input text to sequence of integers

    // Pad the sequence to match the expected input length
    while (inputSequence.length < maxLength) {
      inputSequence.unshift(0);
    }

    // Convert to tensor and ensure it's 2D ([1, maxLength])
    const inputTensor = tf.tensor2d([ inputSequence ], [ 1, maxLength ]);

    const predictedWord = predictNextWord(inputTensor);
    currentText = currentText + " " + predictedWord;
  }
  return currentText;
}
