import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import DocPage from "./pages/DocPage";
import MainLayout from "./components/layout/MainLayout";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="/doc/:docId" element={<DocPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
