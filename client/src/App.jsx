import {BrowserRouter, Route} from "react-router-dom";
import {Chat, Join} from "./components";

const App = () => {
	return (
		<BrowserRouter>
			<Route path={"/"} exact component={Join}/>
			<Route path={"/chat"} exact component={Chat}/>
			<div>App</div>
		</BrowserRouter>
	);
}

export default App;