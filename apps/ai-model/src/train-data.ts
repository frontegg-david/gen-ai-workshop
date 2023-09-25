import * as tf from '@tensorflow/tfjs';
tf.setBackend('cpu');
class Tokenizer {
  wordIndex: Map<string, number>
  indexWord: Map<number, string>
  wordCount: Map<string, number>

  constructor() {
    this.wordIndex = new Map();
    this.indexWord = new Map();
    this.wordCount = new Map();
  }

  fitOnTexts(texts) {
    let index = 1;
    texts.forEach(text => {
      text.split(' ').forEach(word => {
        if (!(word in this.wordIndex)) {
          this.wordIndex[word] = index;
          this.indexWord[index] = word;
          this.wordCount[word] = 1;
          index++;
        } else {
          this.wordCount[word]++;
        }
      });
    });
  }

  textsToSequences(texts) {
    return texts.map(text => text.split(' ').map(word => this.wordIndex[word] || 0));
  }
}

function padSequences(sequences, maxlen, padding = 'post') {
  return sequences.map(seq => {
    if (seq.length < maxlen) {
      let pads = Array(maxlen - seq.length).fill(0);
      if (padding === 'post') {
        return seq.concat(pads);
      } else {
        return pads.concat(seq);
      }
    } else {
      return seq.slice(0, maxlen);
    }
  });
}

const tokenizer = new Tokenizer();
const model = tf.sequential();
let maxLen: number;
export const buildTranDataV2 = () => {
  // const x = "category,question\r\nadd new user,How to add a new user?\r\nadd new user,Can you guide me on adding a new user?\r\nadd new user,Steps to add a new user?\r\nadd new user,Add new user process?\r\nadd bulk users,How can I add multiple users at once?\r\nadd bulk users,Is there a way to bulk add users?\r\nadd bulk users,Guide me on adding users in bulk\r\nadd bulk users,Steps to add multiple users in one go?\r\nfilter by new users,How do I filter users by 'new' status?\r\nfilter by new users,Can you show me how to filter users by 'new'?\r\nfilter by new users,Steps to filter users by new status?\r\nfilter by new users,Filtering users by new?\r\ndisplay total active users,How can I see the total number of active users?\r\ndisplay total active users,Can I get the count of active users?\r\ndisplay total active users,Steps to view the total active users?\r\ndisplay total active users,Displaying the total active user count?\r\nsort by last visited,How to sort users by their last visited date?\r\nsort by last visited,Is it possible to sort users by last visited?\r\nsort by last visited,Steps to sort users by last visited?\r\nsort by last visited,Sorting users by last visited date?\r\nsort by created date,How do I sort users by their created date?\r\nsort by created date,Can you guide me on sorting users by created date?\r\nsort by created date,Steps to sort users by creation date?\r\nsort by created date,Sorting users by created date?\r\nedit user role,How can I edit a user's role?\r\nedit user role,Is it possible to change a user's role?\r\nedit user role,Steps to edit a user's role?\r\nedit user role,Editing a user's role?\r\n"

  const data = {
    'add new user': [
      'How to add a new user?',
      'Can you guide me on adding a new user?',
      'Steps to add a new user?',
      'Add new user process?',
    ],
    'add bulk users': [
      'How can I add multiple users at once?',
      'Is there a way to bulk add users?',
      'Guide me on adding users in bulk',
      'Steps to add multiple users in one go?',
    ],
    'filter by new users': [
      'How do I filter users by \'new\' status?',
      'Can you show me how to filter users by \'new\'?',
      'Steps to filter users by new status?',
      'Filtering users by new?',
    ],
    'display total active users': [
      'How can I see the total number of active users?',
      'Can I get the count of active users?',
      'Steps to view the total active users?',
      'Displaying the total active user count?',
    ],
    'sort by last visited': [
      'How to sort users by their last visited date?',
      'Is it possible to sort users by last visited?',
      'Steps to sort users by last visited?',
      'Sorting users by last visited date?',
    ],
    'sort by created date': [
      'How do I sort users by their created date?',
      'Can you guide me on sorting users by created date?',
      'Steps to sort users by creation date?',
      'Sorting users by created date?',
    ],
    'edit user role': [
      'How can I edit a user\'s role?',
      'Is it possible to change a user\'s role?',
      'Steps to edit a user\'s role?',
      'Editing a user\'s role?',
    ]
  };

  // Flatten dataset
  const sentences = [];
  const labels = [];
  const labelToIndex = {};
  let index = 0;
  for (let label in data) {
    labelToIndex[label] = index;
    for (let sentence of data[label]) {
      sentences.push(sentence);
      labels.push(index);
    }
    index++;
  }

  // Tokenization

  tokenizer.fitOnTexts(sentences);
  const sequences = tokenizer.textsToSequences(sentences);

// Prepare input-output pairs
  const X = [];
  const Y = [];
  for (let sequence of sequences) {
    for (let i = 1; i < sequence.length; i++) {
      X.push(sequence.slice(0, i));
      Y.push(sequence[i]);
    }
  }

// Padding
  maxLen = Math.max(...X.map(seq => seq.length));
  const X_padded = padSequences(X, maxLen, 'post');

// Model definition

  model.add(tf.layers.embedding({ inputDim: tokenizer.wordIndex.size + 1, outputDim: 50, inputLength: maxLen }));
  model.add(tf.layers.lstm({ units: 100, returnSequences: true }));
  model.add(tf.layers.lstm({ units: 100 }));
  model.add(tf.layers.dense({ units: tokenizer.wordIndex.size + 1, activation: 'softmax' }));

  model.compile({ optimizer: 'adam', loss: 'sparseCategoricalCrossentropy', metrics: [ 'accuracy' ] });

// Training
  model.fit(X_padded, Y, { epochs: 10, batchSize: 32 });

  return model
}

export function autocomplete(inputText) {
  // let tokenized = tokenizer.textsToSequences([ inputText ]);
  // let padded = padSequences(tokenized, maxLen, 'post');
  //
  // console.log(padded);
  // let tensorInput = tf.tensor2d(padded);
  //
  // console.log(model.inputs);
  // console.log(tensorInput.shape);
  //
  //
  // model.summary()
  //
  // // let reshapedInput = tensorInput.reshape([1, 9]);
  // // let reshapedInput = tensorInput.reshape([1, ...tensorInput.shape]);
  // // let prediction = model.predict(tensorInput);
  // // let prediction = model.predict(reshapedInput);
  // let prediction = model.predictOnBatch(tensorInput)
  //
  // let tensorResult;
  // if (Array.isArray(prediction)) {
  //   // If the model returns multiple tensors, choose the appropriate one.
  //   // Here, we're picking the first tensor, but you should choose the relevant one based on your model.
  //   tensorResult = prediction[0];
  // } else {
  //   tensorResult = prediction;
  // }
  //
  // let nextWordIndex = tensorResult.argMax(-1).dataSync()[0];
  // let nextWord = tokenizer.indexWord[nextWordIndex];
  // return inputText + ' ' + nextWord;


  const simpleModel = tf.sequential();
  simpleModel.add(tf.layers.dense({units: 10, inputShape: [9]}));
  simpleModel.add(tf.layers.dense({units: 1}));

  simpleModel.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

  let tokenized = tokenizer.textsToSequences([ inputText ]);
  let padded = padSequences(tokenized, maxLen, 'post');
  while (padded[0].length < 9) {
    padded[0].push(0);  // or whatever padding value you're using
  }


  // let flatArray = new Float32Array(padded.flat());
  // let tensorInput = tf.tensor2d(flatArray, [1, padded.length]);

  const tensorInput = tf.tensor2d(padded, [1, 9]);
  const testOutput = simpleModel.predict(tensorInput);
  if(Array.isArray(testOutput)){
    console.log(testOutput.map(t => t.dataSync()))
  }else {
    console.log(testOutput.dataSync());
  }
}

export const buildTranData = (): {
  trainData: Set<string>,
  charToIndex: Record<string, number>,
  indexToChar: Record<number, string>
} => {

  const data = {
    'add new user': [
      'How to add a new user?',
      'Can you guide me on adding a new user?',
      'Steps to add a new user?',
      'Add new user process?',
    ],
    'add bulk users': [
      'How can I add multiple users at once?',
      'Is there a way to bulk add users?',
      'Guide me on adding users in bulk',
      'Steps to add multiple users in one go?',
    ],
    'filter by new users': [
      'How do I filter users by \'new\' status?',
      'Can you show me how to filter users by \'new\'?',
      'Steps to filter users by new status?',
      'Filtering users by new?',
    ],
    'display total active users': [
      'How can I see the total number of active users?',
      'Can I get the count of active users?',
      'Steps to view the total active users?',
      'Displaying the total active user count?',
    ],
    'sort by last visited': [
      'How to sort users by their last visited date?',
      'Is it possible to sort users by last visited?',
      'Steps to sort users by last visited?',
      'Sorting users by last visited date?',
    ],
    'sort by created date': [
      'How do I sort users by their created date?',
      'Can you guide me on sorting users by created date?',
      'Steps to sort users by creation date?',
      'Sorting users by created date?',
    ],
    'edit user role': [
      'How can I edit a user\'s role?',
      'Is it possible to change a user\'s role?',
      'Steps to edit a user\'s role?',
      'Editing a user\'s role?',
    ]
  };

// Create sequences and next character
  const sequences = [];
  const nextChars = [];
  const chars = new Set<string>();

  for (let spec in data) {
    for (let cmd of data[spec]) {
      for (let i = 0; i < cmd.length - 1; i++) {
        sequences.push(cmd.slice(0, i + 1));
        nextChars.push(cmd[i + 1]);
        chars.add(cmd[i]);
      }
    }
  }

  const charToIndex: Record<string, number> = {};
  const indexToChar: Record<number, string> = {};
  Array.from(chars).forEach((char: string, index: number) => {
    charToIndex[char] = index;
    indexToChar[index] = char;
  });

  return { trainData: chars, charToIndex, indexToChar };

}

