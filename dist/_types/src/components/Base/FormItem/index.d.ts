import { ReactElement, ReactNode } from 'react';
export default function FormItem(options: {
    title: string;
    suffix?: ReactElement;
    require?: boolean;
    description?: ReactElement | string;
    error?: {
        msg: ReactNode;
    };
    children?: ReactElement;
}): import("react/jsx-runtime").JSX.Element;
