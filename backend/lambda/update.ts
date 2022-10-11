const AWS = require("aws-sdk");


const dynamoDb = new AWS.DynamoDB.DocumentClient();



type Params = {
    TableName: string | undefined,
    Key: any,
    ExpressionAttributeValues: any,
    ExpressionAttributeNames: any,
    UpdateExpression: string,
    ReturnValues: string
}

export const updateTodo = async (todo: any) => {
    let params:Params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            id: todo.id
        },
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {},
        UpdateExpression: "",
        ReturnValues: "UPDATED_NEW"
    };
    let prefix = "set ";
    let attributes = Object.keys(todo);
    for (let i = 0; i < attributes.length; i++) {
        let attribute = attributes[i];
        if (attribute !== "id") {
            params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
            params["ExpressionAttributeValues"][":" + attribute] = todo[attribute];
            params["ExpressionAttributeNames"]["#" + attribute] = attribute;
            prefix = ", ";
        }
    }
    try {
        const result = await dynamoDb.put(params).promise()
        return result
    }  catch (err) {
        console.log(err)
        return null
    }
}


