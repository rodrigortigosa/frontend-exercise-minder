import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { tasks } from "../mocks/tasks";
import { Box, Stack, Typography } from "@mui/material";
import { ListTasks } from "../components/ListTasks";

const tasksMock = tasks;

const Tasks = () => {
	const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
	const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);

	useEffect(() => {
		const filteredPendingTasks: Task[] = [];
		const filteredFinishedTasks: Task[] = [];

		tasksMock.forEach((task) => {
			if (task.completed) filteredFinishedTasks.push(task);
			else filteredPendingTasks.push(task);
		});
		setFinishedTasks(filteredFinishedTasks);
		setPendingTasks(filteredPendingTasks);
	}, []);

	return (
		<main>
			<Box sx={{ p: "10px", gap: "10px" }}>
				<Typography variant="h3" style={{ paddingBottom: "17px" }}>
					Lista de tareas
				</Typography>
				<Stack sx={{ gap: "32px", my: "10px" }}>
					{pendingTasks.length > 0 ? (
						<ListTasks title={"Pendientes"} tasks={pendingTasks} />
					) : (
						<p>No hay tareas pendientes</p>
					)}
					{finishedTasks.length > 0 ? (
						<ListTasks title="Terminadas" tasks={finishedTasks} />
					) : (
						<p>No hay tareas terminadas</p>
					)}
				</Stack>
			</Box>
		</main>
	);
};

export default Tasks;
