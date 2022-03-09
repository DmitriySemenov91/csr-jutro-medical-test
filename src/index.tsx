import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// link
import { client } from "./https";

// apollo
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
