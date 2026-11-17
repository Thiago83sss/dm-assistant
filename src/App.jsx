import { useState } from "react";
import Navbar from "./components/Navbar";
import Bestiary from "./modules/Bestiary";
import LootGenerator from "./modules/LootGenerator";
import DiceTray from "./modules/DiceTray";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("bestiary");

  return (
    <div className="app">
      <header className="header">
        <h1>⚔️ Asistente del DM</h1>
      </header>

      <main className="main">
        {tab === "bestiary" && <Bestiary />}
        {tab === "loot" && <LootGenerator />}
        {tab === "dice" && <DiceTray />}
      </main>

      <Navbar active={tab} onChange={setTab} />
    </div>
  );
}