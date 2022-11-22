import styles from "@/styles/components/ui/Checkbox.module.scss";
import React, { forwardRef, InputHTMLAttributes } from "react";
export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const LabeledCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className={styles.container}>
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
