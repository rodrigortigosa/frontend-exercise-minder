import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { Category } from "../types/Category";
import { Box, Fab, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ListTasks } from "../components/ListTasks";
import AddTaskModal from "../components/AddTaskModal";
import { createTask, getTasks, updateTask } from "../services/tasks";
import { getCategories } from "../services/categories";

const Tasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
	const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [categories, setCategories] = useState<Category[]>([]);
	const [updateTasks, setUpdateTasks] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCheck = (id: string) => {
		const task = tasks.find((task) => task.id === id);
		if (task) {
			const updatedTask = { ...task, completed: !task.completed };
			try {
				updateTask(updatedTask);
				setUpdateTasks(!updateTasks);
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error al obtener las tareas: ", error.message);
				} else {
					console.error("Error desconocido: ", error);
				}
			}
		}
	};

	const handleAdd = (task: Omit<Task, "color" | "category">) => {
		try {
			createTask(task);
			setUpdateTasks(!updateTasks);
		} catch (error) {
			if (error instanceof Error) {
				console.error("Error al crear la tarea: ", error.message);
			} else {
				console.error("Error desconocido: ", error);
			}
		}
	};

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const fetchedTasks: Task[] = await getTasks();
				setTasks(fetchedTasks);
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error al obtener las tareas: ", error.message);
				} else {
					console.error("Error desconocido: ", error);
				}
			}
		};

		const fetchCategories = async () => {
			try {
				const fetchedCategories: Category[] = await getCategories();
				setCategories(fetchedCategories);
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error al obtener las tareas: ", error.message);
				} else {
					console.error("Error desconocido: ", error);
				}
			}
		};

		setLoading(true);
		fetchTasks()
			.then(() => fetchCategories())
			.finally(() => setLoading(false));
	}, [updateTasks]);

	useEffect(() => {
		const filteredPendingTasks: Task[] = [];
		const filteredFinishedTasks: Task[] = [];

		tasks.forEach((task) => {
			const category =
				categories.find((category) => category.id === task.category_id) || null;
			const newTask = {
				...task,
				category: category?.name || null,
				color: category?.color || "#FFF",
			};
			if (newTask.completed) {
				filteredFinishedTasks.push(newTask);
			} else filteredPendingTasks.push(newTask);
		});
		setFinishedTasks(filteredFinishedTasks);
		setPendingTasks(filteredPendingTasks);
	}, [tasks, categories]);

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
				<Box sx={{ display: "grid", height: "20vh" }}>
					<Fab
						color="primary"
						size="large"
						aria-label="add"
						sx={{ justifySelf: "end", alignSelf: "end" }}
						onClick={handleClickOpen}
					>
						<AddIcon />
					</Fab>
				</Box>
			</Box>
			<AddTaskModal
				open={open}
				onClose={handleClose}
				categories={categories}
				onAdd={handleAdd}
			/>
		</main>
	);
};

export default Tasks;
