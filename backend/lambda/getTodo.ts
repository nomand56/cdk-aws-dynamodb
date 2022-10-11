const AWS = require("aws-sdk");


const dynamoDb = new AWS.DynamoDB.DocumentClient();


export const getTodo = async () => {
  const params = {
    TableName: process.env.TABLE_NAME as string ,
  
  };
  // const command = new ScanCommand(params);
  try {
    const result = await dynamoDb.scan(params).promise()
    if (result.Items) {
      // Return the retrieved item
      return result.Items;
    } else {
      return null;
    }
  } catch (dbError) {
    console.log(dbError);
    return null;
  }
}