import { useState, useCallback } from "react";

export default function useDialogModal<T extends object = {}>(
    Component: React.ComponentType<{ open: boolean; onClose: () => void } & T>
) {
    const [open, setOpen] = useState(false);

    const openDialog = useCallback(() => {
        setOpen(true);
    }, []);

    const DialogComponent = useCallback(
        (props: T) => {
            if (!open) return null;

            return (
                <Component
                    open={open}
                    onClose={() => setOpen(false)}
                    {...props}
                />
            );
        },
        [open, Component]
    );

    return [DialogComponent, openDialog] as const;
}
