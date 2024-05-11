import { UserType,TodoType } from "./commonTypes"

export type TodoModalProps = {
    isOpen: boolean,
    onClose: ()=> void,
    Todo: TodoType
    onAddTodo: (Todo:TodoType)=> void
    onUpdateTodo: (Todo:TodoType)=> void
}