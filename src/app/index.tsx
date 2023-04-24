import { withProviders } from "./providers";
import { Routing } from "pages";

export const App = () => (<Routing />);

export default withProviders(App);
