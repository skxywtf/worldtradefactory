import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

type CheckoutContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  activeStep: number; 
  setActiveStep: Dispatch<SetStateAction<number>>
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [name, setName] = useState<string>("checkout");
  const [activeStep, setActiveStep] = useState(1);

  return (
    <CheckoutContext.Provider value={{ name, setName, activeStep, setActiveStep }}>
      {children}
    </CheckoutContext.Provider>
  );
}