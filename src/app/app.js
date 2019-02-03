import React from "react";
import { createStore } from "redux";
import { StoreContext } from "redux-react-hook";

import { mainReducer } from "./app.reducer";
import { Layout } from "./layout/layout";
import { Aquarium } from "./aquarium/aquarium";

const store = createStore(mainReducer);

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Layout>
        <Aquarium />
      </Layout>
    </StoreContext.Provider>
  );
};

export default App;
