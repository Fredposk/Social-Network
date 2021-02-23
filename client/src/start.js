import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./components/App";
import Welcome from "./components/Welcome";
import reducer from "./reducer";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import { init } from "./components/Socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
