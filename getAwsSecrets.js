const AWS = require('aws-sdk');

var secretName = "nurSecrets";
const client = new AWS.SecretsManager({
    region : "us-east-1",
    secretName: secretName,
    accessKeyId: "AKIAUHOIPN5UQIKK6HNQ",
    secretAccessKey: "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"
});

// Call the AWS API and return a Promise
function getAwsSecret(secretName) {
  return client.getSecretValue({ SecretId: secretName }).promise();
}

// Create a async function to use the Promise
// Top level await is a proposal
async function getAwsSecretAsync (secretName) {
  var error;
  var response = await getAwsSecret(secretName).catch(err => (error = err));
  return [error, response];
}

// // Call the async function and return NodeJS callback style
// module.exports = function asyncExample () {
//   var [error, secret] = getAwsSecretAsync('dev/MySecret/MyService');
  
//   if (error) {
//     // Trigger an error and halt
//     console.error(error);
//     return;
//   }
  
//   // Use the result
//   console.debug(secret);
// }

async function sample() {
    console.log(process.env.envKey);
    var [error, secret] = await getAwsSecretAsync(secretName);
    console.log(secret.SecretString);
}

sample();


