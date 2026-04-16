"use client";
import { store } from "@/state/store";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" duration={1500} />
    </Provider>
  );
};

export default LayoutProvider;
