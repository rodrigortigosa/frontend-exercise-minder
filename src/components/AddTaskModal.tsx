import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../types/Category";
import { Task } from "../types/Task";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";

type AddTaskModalProps = {
	open: boolean;
	categories: Category[];
	onClose: () => void;
	onAdd: (task: Omit<Task, "color" | "category">) => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({
	open,
	onClose,
	categories,
	onAdd,
}) => {
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

	const handleChangeCategory = (id: string) => {
		setSelectedCategoryId(id);
	};

	const handleClose = () => {
		onClose();
		setSelectedCategoryId("");
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());
		const { title, description, category } = formJson;

		const newTask: Omit<Task, "color" | "category"> = {
			id: uuidv4(),
			title,
			description: description !== "" ? description : null,
			category_id: category,
			completed: false,
		};
		console.log(newTask.id);
		onAdd(newTask);
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				onSubmit,
				sx: { width: "444px" },
			}}
		>
			<DialogTitle>Nueva tarea</DialogTitle>
			<DialogContent>
				<Stack gap="16px">
					<TextField
						required
						autoFocus
						id="title"
						name="title"
						label="Título"
						type="text"
						margin="dense"
						variant="standard"
						fullWidth
						inputProps={{ maxLength: 40 }}
						sx={{ m: 0 }}
					/>
					<TextField
						id="description"
						name="description"
						label="Descripción"
						type="text"
						margin="dense"
						variant="standard"
						fullWidth
						inputProps={{ maxLength: 100 }}
						sx={{ m: 0 }}
					/>
					<FormControl
						required
						size="medium"
						variant="standard"
						fullWidth
						sx={{ m: 0 }}
					>
						<InputLabel id="select-category-label">Categoría</InputLabel>
						<Select
							id="select-category"
							labelId="select-category-label"
							name="category"
							label="Categoría"
							variant="standard"
							value={selectedCategoryId}
							onChange={(event) => handleChangeCategory(event.target.value)}
						>
							{categories.map((category) => (
								<MenuItem key={category.id} value={category.id}>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					size="medium"
					variant="outlined"
					sx={{ width: "124px" }}
					onClick={handleClose}
				>
					Cancelar
				</Button>
				<Button
					size="medium"
					variant="contained"
					sx={{ width: "124px" }}
					type="submit"
				>
					Crear
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddTaskModal;
