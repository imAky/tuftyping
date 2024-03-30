"use client";
import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMenu = () => {
    setIsMuted((prevState) => !prevState);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMenu }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  return useContext(SoundContext);
};
