import { Task } from "../types/Task";
import { StateTasks } from "../types/StateTasks";
import { Box, Stack, Typography } from "@mui/material";
import { TaskItem } from "./TaskItem";

type ListTasksProps = {
	title: StateTasks;
	tasks: Task[];
};

export const ListTasks: React.FC<ListTasksProps> = ({ title, tasks }) => {
	return (
		<Box>
			<Typography variant="h6" sx={{ mb: "8px" }}>
				{title}
			</Typography>
			<Stack sx={{ gap: "16px" }}>
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} />
				))}
			</Stack>
		</Box>
	);
};
