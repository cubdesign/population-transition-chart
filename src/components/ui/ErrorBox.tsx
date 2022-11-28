import styles from "@/styles/components/ui/ErrorBox.module.scss";
import clsx from "clsx";
import { FC } from "react";

export type ErrorBoxProps = {
  message: string;
  retry?: boolean;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
};
const ErrorBox: FC<ErrorBoxProps> = ({
  message,
  retry = false,
  onRetry,
  retryText = "再読み込み",
  className,
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.inner}>
        <h2 className={styles.message}>{message}</h2>
        {retry && (
          <button className={styles.button} onClick={handleRetry}>
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBox;
