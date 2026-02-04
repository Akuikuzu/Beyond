"use client";
import data from "../../public/data/data.json";
import { useState } from "react";
import Form from "./Form";

type Props = { onToggleContent: (mode: number | null) => void; activeIndex: number | null };

const Nav = ({ onToggleContent, activeIndex }: Props) => {

  //Til contact
  const [showContact, setShowContact] = useState(false);

  const openStuff = () => {
    setShowContact(true);
  };

  return (
    <>
      <nav id="nav">
        <ul>
          {data && data.map((d, i) => (
            <li key={d.id} className={activeIndex === i ? "active" : ""}><span onClick={() => {onToggleContent(i)}}>{d.name}</span></li>
          ))}
        </ul>
      </nav>

      <button id="contact" onClick={openStuff}>Contact</button>
      {showContact && <Form showForm={showContact} setShowForm={setShowContact} />}
    </>
  );
};

export default Nav;