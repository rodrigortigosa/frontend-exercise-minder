import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import Tasks from "./pages/Tasks";

const theme = createTheme();

function App() {
	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Container maxWidth="md" sx={{ pt: "64px", pb: "40px" }}>
					<Tasks />
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
