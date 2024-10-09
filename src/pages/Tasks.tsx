import { Box, Typography } from "@mui/material";
import { TaskItem } from "../components/TaskItem";
import { task } from "../mocks/task";

const taskMock = task;

const Tasks = () => {
	return (
		<main>
			<Box sx={{ p: "10px", gap: "10px" }}>
				<Typography variant="h3" style={{ paddingBottom: "17px" }}>
					Lista de tareas
				</Typography>
				<TaskItem task={taskMock} />
			</Box>
		</main>
	);
};

export default Tasks;
