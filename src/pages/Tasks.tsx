import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { Box, Stack, Typography } from "@mui/material";
import { ListTasks } from "../components/ListTasks";
import { getTasks } from "../services/tasks";

const Tasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
	const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

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
		const fetchTasks = async () => {
			setLoading(true);
			try {
				const fetchedTasks: Task[] = await getTasks();
				setTasks(fetchedTasks);
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error al obtener las tareas: ", error.message);
				} else {
					console.error("Error desconocido: ", error);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchTasks();
	}, []);

	useEffect(() => {
		const filteredPendingTasks: Task[] = [];
		const filteredFinishedTasks: Task[] = [];

		tasks.forEach((task) => {
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
				{loading ? (
					<Box>
						<p>Cargando las tareas...</p>
					</Box>
				) : (
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
				)}
			</Box>
		</main>
	);
};

export default Tasks;
