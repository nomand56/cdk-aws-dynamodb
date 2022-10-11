import { DeleteCommand} from "@aws-sdk/lib-dynamodb";
// import {Dynamo}
import { dynamoDb } from "./dbClient";



export const deleteTodo=async (todo:string)=>{
const param={
TableName:process.env.TABLE_NAME,
Key:{
    id:todo
}

    }

    //add item to dynamodb
let command=new DeleteCommand(param)
try {
    const result=await dynamoDb.send(command)
    console.log("item Deleted")
    return  result
}
catch(err){
    console.log(err)
    return null    
}
}


