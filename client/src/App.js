import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./view/LandingPage/LandingPage";
import Login from "./view/Login/Login";
import Register from "./view/Login/Register";
import FuncPage from "./view/FuncPage/FuncPage";
import AddElements from "./components/AddElements/AddElements";
import EditElements from "./components/EditElements/EditElements";
import DeleteElements from "./components/DeleteElements/DeleteElements";
import Report from "./components/Report/Report";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          <Route path="/signup" element={<Register />} />{" "}
          <Route exact path="/landingpage" element={<LandingPage />} />{" "}
          <Route path="/funcpage" element={<FuncPage />}>
            <Route path="addelements" element={<AddElements />} />{" "}
            <Route path="editelements" element={<EditElements />} />{" "}
            <Route path="deleteelements" element={<DeleteElements />} />{" "}
            <Route path="report" element={<Report />} />{" "}
          </Route>{" "}
          {/* <Route path="/cpu" element={<Cpu />} />{" "}
                                <Route path="/laptop" element={<Laptop />} />{" "}
                                <Route path="/printer" element={<Printer />} />{" "}
                                <Route path="/server" element={<Server />} />{" "}
                                <Route path="/routers" element={<Routers />} />{" "}
                                <Route path="/support" element={<Support />} />{" "} */}{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
