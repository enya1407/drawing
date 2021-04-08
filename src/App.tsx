import React, { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Objects from "./components/Objects";
import CardBuilding from "./components/CardBuilding";
import AddBuilding from "./components/AddBuilding";

interface dataType {
  key: string;
  name: string;
  address: string;
  owner: string;
  occupiedAreas?: number;
  freeAreas?: number;
  occupancy?: number;
}

const App = () => {
  const [data, setData] = useState<dataType[]>([]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Objects data={data} />} />
        <Route
          path="/add-building"
          component={() => <AddBuilding setData={setData} />}
        />
        <Route
          path="/card-building"
          component={() => <CardBuilding setData={setData} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
