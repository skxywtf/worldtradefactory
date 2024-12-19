import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

type CheckoutContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  activeStep: number; 
  setActiveStep: Dispatch<SetStateAction<number>>;
  billingCycle: boolean;
  setBillingCycle: Dispatch<SetStateAction<boolean>>;
  selectPlan: string;
  setSelectPlan: Dispatch<SetStateAction<string>>;
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [name, setName] = useState<string>("hamlo");
  const [activeStep, setActiveStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState(true)
  const [selectPlan, setSelectPlan] = useState('')

  return (
    <CheckoutContext.Provider value={{ name, setName, activeStep, setActiveStep, billingCycle, setBillingCycle, selectPlan, setSelectPlan }}>
      {children}
    </CheckoutContext.Provider>
  );
}