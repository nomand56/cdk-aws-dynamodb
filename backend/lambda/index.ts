import { getTodo } from './getTodo'
import { updateTodo } from './update'
import { addTodo } from "./addTodo"
import { deleteTodo } from './delete'
import todo from "./todo"
type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        todoId: string,
        todo: todo
    }
}


exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "getTodo":
            return await getTodo();
        case "addTodo":
            return await addTodo(event.arguments.todo);
        case "updateTodo":
            return await updateTodo(event.arguments.todo);
        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId);
        default:    
            return null;   
    }

}