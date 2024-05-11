export type UserType = {
    id: Number;
    email: string;
    name:string;
    password: string;
    phone: string;
    address: string;
    created_at: Date;
}

export type TodoType = {
    id:number;
    title: string;
    description: string;
    is_completed: boolean;
    user_id:number;
}

export type NewTodoType = {
    title: string;
    description: string;
    is_completed: boolean;
    user_id:number;
}