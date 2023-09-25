// import * as tf from '@tensorflow/tfjs';
// import { buildTranDataV2,  autocomplete} from './train-data';
// // import { buildModel } from './lstm';
//
// // const { trainData, charToIndex, indexToChar } = buildTranData()
//
//
// // const model = buildModel(trainData);
// //
// // function preprocess(inputText) {
// //   // Convert input text to sequence of character indices
// //   const charIndices = inputText.split('').map(char => charToIndex[char] || 0);
// //
// //   // Pad/truncate the sequence to a fixed length (e.g., 20 characters)
// //   while (charIndices.length < 20) {
// //     charIndices.push(0); // Use 0 as padding value
// //   }
// //   if (charIndices.length > 20) {
// //     charIndices.splice(0, charIndices.length - 20);
// //   }
// //
// //   // Convert to a tensor and expand dimensions to fit model input shape
// //   return tf.tensor2d([ charIndices ]);
// // }
// //
// //
// // function suggestCompletion(inputText, numChars = 20) {
// //
// //
// //   let currentText = inputText;
// //   for (let i = 0; i < numChars; i++) {
// //     let processedInput = preprocess(currentText);  // Convert characters to their respective indices
// //     let prediction = model.predict(processedInput);
// //
// //     let predictedTensor;
// //     if (Array.isArray(prediction)) {
// //       // If you expect multiple output tensors, choose the relevant one.
// //       // For this example, we're just picking the first tensor.
// //       predictedTensor = prediction[0];
// //     } else {
// //       predictedTensor = prediction;
// //     }
// //
// //     // Ensure the tensor is 2D, if not, reshape or adjust the axis in argMax
// //     if (predictedTensor.shape.length === 1) {
// //       predictedTensor = predictedTensor.reshape([ 1, predictedTensor.shape[0] ]);
// //     }
// //
// //     let predictedIndexTensor = tf.argMax(predictedTensor, 1);
// //     let predictedIndex = predictedIndexTensor.dataSync()[0];
// //     let nextChar = indexToChar[predictedIndex];
// //     currentText = currentText + nextChar;
// //
// //   }
// //   return currentText;
// // }
// // console.log("start")
//
//
// // buildTranDataV2();
//
// console.log('how to add: ', autocomplete('add new '))
// // console.log('how to add: ', autocomplete('How to add '))


import { modelSummary, autoComplete } from './test2';

modelSummary().then(()=>{
  console.log('add new:', autoComplete('add new'))
  console.log('add user:', autoComplete('add user'))
  console.log('how to add:', autoComplete('how to add'))
})



