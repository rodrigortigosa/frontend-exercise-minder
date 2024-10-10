import { Stack } from "@mui/material";
import { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";

type ListTasksProps = {
	tasks: Task[];
};

export const ListTasks: React.FC<ListTasksProps> = ({ tasks }) => {
	return (
		<Stack sx={{ gap: "16px" }}>
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</Stack>
	);
};
