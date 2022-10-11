const AWS = require("aws-sdk");




const dynamoDb = new AWS.DynamoDB.DocumentClient();

import todo from "./todo"

export const addTodo = async (todo: todo) => {
    const param = {
        TableName: process.env.TABLE_NAME,
        Item: todo

    }

    //add item to dynamodb
    // let command=new  PutItemCommand(param)
    try {
        await dynamoDb.put(param).promise()
        return todo

    }
    catch (err) {
        console.log(err)
        return null
    }
}


