import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import { pluss } from "./assets";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-black text-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <div className="flex items-center ">
            <img src={pluss} alt="logo" className="  object-contain" />
            <h1 className="ml-5">
              Borgar's AI bilde-generator basert på openai
            </h1>
          </div>
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#ffffff] text-black px-4 py-2 rounded-md"
        >
          Lag nytt bilde
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
