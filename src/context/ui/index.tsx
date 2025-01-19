import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UIContextType {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showSearchBox: boolean; // Add this line to include showSearchBox
    setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
    children: ReactNode;
}

const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false); // Track showSearchBox state

    return (
        <UIContext.Provider
            value={{
                drawerOpen,
                setDrawerOpen,
                showSearchBox,
                setShowSearchBox,
            }} // Include showSearchBox
        >
            {children}
        </UIContext.Provider>
    );
};

export const useUIContext = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error("useUIContext must be used within a UIProvider");
    }
    return context;
};

export default UIProvider;
