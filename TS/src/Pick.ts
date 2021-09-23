interface PickTodo {
  title: string;
  description: string;
  completed: boolean;
}

type PickTodoPreview = Pick<PickTodo, "title" | "completed">;

const pickTodo: PickTodoPreview = {
  title: "Clean room",
  completed: false,
};
