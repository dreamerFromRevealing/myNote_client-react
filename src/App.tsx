import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}>
        <Route path="/doc/:docId" element={<MainPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
