import styles from "@/styles/components/ui/Checkbox.module.scss";
import React, { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
};

const LabeledCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...rest }, ref) => {
    return (
      <div className={clsx(styles.container, className)}>
        <label>
          <input {...rest} type="checkbox" ref={ref} />
          <span>{label}</span>
        </label>
      </div>
    );
  }
);
LabeledCheckbox.displayName = "LabeledCheckbox";
export default LabeledCheckbox;
