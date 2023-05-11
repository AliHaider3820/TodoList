import inquirer from "inquirer";
const todos = [];
const todoList = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                { name: "Add a task", value: "add" },
                { name: "Complete a task", value: "complete" },
                { name: "View all tasks", value: "view" },
                { name: "Exit", value: "exit" },
            ],
        },
    ]);
    switch (answer.action) {
        case "add":
            const newTaskAnswer = await inquirer.prompt([
                {
                    type: "input",
                    name: "task",
                    message: "What is the new task?",
                },
            ]);
            todos.push({ task: newTaskAnswer.task, completed: false });
            console.log("Task added successfully!");
            break;
        case "complete":
            const taskToCompleteAnswer = await inquirer.prompt([
                {
                    type: "list",
                    name: "task",
                    message: "Which task would you like to complete?",
                    choices: todos
                        .filter((todo) => !todo.completed)
                        .map((todo) => ({ name: todo.task, value: todo })),
                },
            ]);
            taskToCompleteAnswer.task.completed = true;
            console.log("Task completed successfully!");
            break;
        case "view":
            console.table(todos);
            break;
        case "exit":
            console.log("Exiting...");
            process.exit();
            break;
        default:
            console.log("Invalid action!");
            break;
    }
    todoList();
};
todoList();
