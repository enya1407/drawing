import React, { useState } from "react";

import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Objects from "./components/Objects";
import CardBuilding from "./components/CardBuilding";

import AddBuilding from "./components/AddBuilding";
import {dataType} from "./type";


const App = () => {
  const [data, setData] = useState<dataType[]>([]);

  console.log("data", data);

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={() => <Objects data={data} />} />
          <Route
              path="/add-building"
              exact
              component={() => <AddBuilding data={data} setData={setData} />}
          />
          <Route
              path="/card-building"
              component={() => <CardBuilding data={data} setData={setData} />}
          />
        </Switch>
      </BrowserRouter>
  );
};

export default App;
