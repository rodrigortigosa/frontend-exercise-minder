import { Box, Typography } from "@mui/material";

const Tasks = () => {
	return (
		<main>
			<Box sx={{ p: "10px", gap: "10px" }}>
				<Typography variant="h3" style={{ paddingBottom: "17px" }}>
					Lista de tareas
				</Typography>
			</Box>
		</main>
	);
};

export default Tasks;
