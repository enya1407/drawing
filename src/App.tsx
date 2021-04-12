import React, { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Objects from "./components/Objects";
import CardBuilding from "./components/CardBuilding";

import AddBuilding from "./components/AddBuilding";
import { AllDataType, BasicDataType } from "./type";

const App = () => {
  const [basicData, setBasicData] = useState<BasicDataType[]>([]);
  const [allData, setAllData] = useState<AllDataType[]>([]);

  useEffect(() => {
    const basicData = window.localStorage.getItem("basicData");
    const allData = window.localStorage.getItem("allData");

    if (basicData && allData) {
      setBasicData(JSON.parse(basicData));
      setAllData(JSON.parse(allData));
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Objects basicData={basicData} />}
        />
        <Route
          path="/add-building"
          exact
          component={() => (
            <AddBuilding
              basicData={basicData}
              setBasicData={setBasicData}
              allData={allData}
              setAllData={setAllData}
            />
          )}
        />
        <Route
          path="/card-building"
          component={() => (
            <CardBuilding
              basicData={basicData}
              setBasicData={setBasicData}
              allData={allData}
              setAllData={setAllData}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
