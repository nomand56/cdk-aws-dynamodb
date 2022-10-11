import * as AWS from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
export const REGION = "ap-south-1"; // For example, "us-east-1".
// Create an Amazon DynamoDB service client object.
 export const ddbClient = new AWS.DynamoDB({ region: REGION });
const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  };
  
  const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  };
  
  const translateConfig = { marshallOptions, unmarshallOptions };
  
  // Create the DynamoDB document client.`
  const dynamoDb = DynamoDBDocumentClient.from(ddbClient, translateConfig);
  
  export  { dynamoDb };