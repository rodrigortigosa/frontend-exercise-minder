import { Box, Typography } from "@mui/material";
import { tasks } from "../mocks/tasks";
import { ListTasks } from "../components/ListTasks";

const tasksMock = tasks;

const Tasks = () => {
	return (
		<main>
			<Box sx={{ p: "10px", gap: "10px" }}>
				<Typography variant="h3" style={{ paddingBottom: "17px" }}>
					Lista de tareas
				</Typography>
				<ListTasks tasks={tasksMock} />
			</Box>
		</main>
	);
};

export default Tasks;
