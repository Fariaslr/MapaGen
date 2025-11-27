import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Ccps } from '../models/Ccps';

type CcpsContextType = {
  ccpsList: Ccps[];
  currentCcps: Ccps | null;
  setCcpsList: (list: Ccps[]) => void;
  setCurrentCcps: (ccps: Ccps) => void;
};

const CcpsContext = createContext<CcpsContextType | undefined>(undefined);

export const CcpsProvider = ({ children }: { children: ReactNode }) => {
  const [ccpsList, setCcpsList] = useState<Ccps[]>([]);
  const [currentCcps, setCurrentCcps] = useState<Ccps | null>(null);

  return (
    <CcpsContext.Provider
      value={{ ccpsList, currentCcps, setCcpsList, setCurrentCcps }}
    >
      {children}
    </CcpsContext.Provider>
  );
};

export const useCcps = (): CcpsContextType => {
  const context = useContext(CcpsContext);
  if (!context) throw new Error('useCcps must be used within a CcpsProvider');
  return context;
};

