import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import store from "./stateManagemnt/store";

// Import Apollo Client.
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-components";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Provider>
	</React.StrictMode>
);
