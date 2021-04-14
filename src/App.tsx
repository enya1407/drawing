import React, { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Objects from "./components/Objects";
import CardBuilding from "./components/CardBuilding";

import AddBuilding from "./components/AddBuilding";
import { AllDataType } from "./type";

const App = () => {
  const [allData, setAllData] = useState<AllDataType[]>([]);

  useEffect(() => {
    const allData = window.localStorage.getItem("allData");

    if (allData) {
      setAllData(JSON.parse(allData));
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={() => (
            <Objects allData={allData} setAllData={setAllData} />
          )}
        />
        <Route
          path="/add-building"
          exact
          component={() => (
            <AddBuilding allData={allData} setAllData={setAllData} />
          )}
        />
        <Route
          path="/card-building"
          component={() => (
            <CardBuilding allData={allData} setAllData={setAllData} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
