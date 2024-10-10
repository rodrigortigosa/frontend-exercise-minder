import { Checkbox, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Task } from "../types/Task";

type TaskItemProps = {
	task: Task;
	onCheck: (id: string) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onCheck }) => {
	const { id, title, description, completed, category, color } = task;

	return (
		<ListItem
			sx={{
				p: "10px",
				borderRadius: "4px",
				boxShadow: `
        0px 3px 3px rgba(0, 0, 0, 0.20),
        0px 3px 4px rgba(0, 0, 0, 0.14),
        0px 1px 8px rgba(0, 0, 0, 0.12)
      `,
				height: "64px",
				backgroundColor: color,
			}}
		>
			<ListItemIcon sx={{ justifyContent: "center" }}>
				<Checkbox
					edge="start"
					color="primary"
					size="medium"
					checked={completed}
					onChange={() => onCheck(id)}
					inputProps={{ "aria-labelledby": title }}
				/>
			</ListItemIcon>
			<ListItemText
				id={id}
				primary={`${category ? category + ": " : ""}${title}`}
				secondary={description}
			/>
		</ListItem>
	);
};
