import React, { useState } from 'react';
import {
    NUMBER_OF_ROUNDS,
    INTERVALS_PER_ROUND,
  } from '../constants';

  interface AppContextType {
    numberOfRounds: number;
    setNumberOfRounds: React.Dispatch<React.SetStateAction<number>>;
    // ... other state variables
  }

  export const AppContext = React.createContext<AppContextType | null>(null);

  export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    // Add your state here
    const [numberOfRounds, setNumberOfRounds] = useState(NUMBER_OF_ROUNDS);
    // ... other state variables
  
    return (
      <AppContext.Provider value={{ numberOfRounds, setNumberOfRounds /*, other state variables */ }}>
        {children}
      </AppContext.Provider>
    );
  };