export default function DatePickerMobile(options: {
    visible: boolean;
    onConfirm: (value: Date) => void;
    onCancel: () => void;
    value?: Date;
    className?: string;
    defaultValue: Date;
    max?: Date;
}): import("react/jsx-runtime").JSX.Element;
