import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import {aws_dynamodb as dynamodb} from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
    
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'demo',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });
//lambda function for 
const Lambda= new lambda.Function(this, "Lambda", {
  runtime: lambda.Runtime.NODEJS_16_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "index.handler",
  memorySize: 1024,
  timeout: cdk.Duration.seconds(30),

})



const lambdaDs=api.addLambdaDataSource("lambdaDatasource", Lambda)

lambdaDs.createResolver({
  typeName: "Query",
  fieldName: "getTodo",
})
lambdaDs.createResolver({
  typeName: "Mutation",
  fieldName: "addTodo",
})
lambdaDs.createResolver({
  typeName: "Mutation",
  fieldName: "deleteTodo",
})
lambdaDs.createResolver({
  typeName: "Mutation",
  fieldName: "updateTodo",
})
const table=new dynamodb.Table(this, "Table", { 
  partitionKey: {
    name: "id",
    type: dynamodb.AttributeType.STRING,

}
})
table.grantFullAccess(Lambda)
Lambda.addEnvironment('TABLE_NAME', table.tableName);
}
}