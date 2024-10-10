import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { tasks } from "../mocks/tasks";
import { Box, Stack, Typography } from "@mui/material";
import { ListTasks } from "../components/ListTasks";

const tasksMock = tasks;

const Tasks = () => {
	const [tasks, setTasks] = useState<Task[]>(tasksMock);
	const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
	const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);

	const handleCheck = (id: string) => {
		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				task.completed = !task.completed;
			}
			return task;
		});
		setTasks(newTasks);
	};

	useEffect(() => {
		const filteredPendingTasks: Task[] = [];
		const filteredFinishedTasks: Task[] = [];

		tasksMock.forEach((task) => {
			if (task.completed) filteredFinishedTasks.push(task);
			else filteredPendingTasks.push(task);
		});
		setFinishedTasks(filteredFinishedTasks);
		setPendingTasks(filteredPendingTasks);
	}, [tasks]);

	return (
		<main>
			<Box sx={{ p: "10px", gap: "10px" }}>
				<Typography variant="h3" style={{ paddingBottom: "17px" }}>
					Lista de tareas
				</Typography>
				<Stack sx={{ gap: "32px", my: "10px" }}>
					{pendingTasks.length > 0 ? (
						<ListTasks
							title="Pendientes"
							tasks={pendingTasks}
							onCheck={handleCheck}
						/>
					) : (
						<p>No hay tareas pendientes</p>
					)}
					{finishedTasks.length > 0 ? (
						<ListTasks
							title="Terminadas"
							tasks={finishedTasks}
							onCheck={handleCheck}
						/>
					) : (
						<p>No hay tareas terminadas</p>
					)}
				</Stack>
			</Box>
		</main>
	);
};

export default Tasks;
