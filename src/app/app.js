import React from "react";
import { createStore } from "redux";
import { StoreContext } from "redux-react-hook";

import { mainReducer } from "./app.reducer";
import { Layout } from "./layout/layout";
import { Aquarium } from "./aquarium/aquarium";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Capacity } from "./aquarium/capacity/capacity";

const store = createStore(mainReducer);

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Route path="/" exact component={Capacity} />
        <Route
          path="/my-aquarium/"
          component={() => {
            return (
              <Layout>
                <Aquarium />
              </Layout>
            );
          }}
        />
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
