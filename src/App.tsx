import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import DocPage from "./pages/DocPage";
import MainLayout from "./components/layout/MainLayout";
import TODO from "./components/todo/TODO";
import {LogPage} from "./pages/LogPage";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="/doc/:docId" element={<DocPage/>}/>
        <Route path="/todo/:todoId" element={<TODO/>}/>
        <Route path="/log/:logId" element={<LogPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
