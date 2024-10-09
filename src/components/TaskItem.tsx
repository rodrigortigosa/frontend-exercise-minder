import { Checkbox, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Task } from "../types/Task";

type TaskItemProps = {
	task: Task;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const { id, title, description, completed } = task;
	return (
		<ListItem
			key={id}
			sx={{
				p: "10px",
				gap: "10px",
				borderRadius: "4px",
				boxShadow: `
        0px 3px 3px rgba(0, 0, 0, 0.20),
        0px 3px 4px rgba(0, 0, 0, 0.14),
        0px 1px 8px rgba(0, 0, 0, 0.12)
      `,
			}}
		>
			<ListItemIcon sx={{ justifyContent: "center" }}>
				<Checkbox
					edge="start"
					color="primary"
					size="medium"
					checked={completed}
					// disableRipple
					inputProps={{ "aria-labelledby": title }}
				/>
			</ListItemIcon>
			<ListItemText id={title} primary={title} secondary={description} />
		</ListItem>
	);
};
