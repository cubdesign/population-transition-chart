import styles from "@/styles/components/PrefectureSelector.module.scss";
import React, { FC } from "react";
import LabeledCheckbox from "@/components/ui/LabeledCheckbox";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import usePrefecture, { Prefecture } from "../hooks/usePrefecture";
import ErrorBox from "@/components/ui/ErrorBox";

type FormInput = {
  // 選択した都道府県のID（falseも許容）
  // 例: { 5: true, 22: false, ... }
  selected: boolean[];
};

const schema = yup.object({
  prefectures: yup.array().of(yup.boolean()),
});

export type PrefectureSelectorProps = {
  onChangePrefecture?: (
    change: { prefecture: Prefecture; checked: boolean },
    all: Prefecture[]
  ) => void;
  className?: string;
};

const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  onChangePrefecture,
  className,
}) => {
  const { control, setValue } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: { selected: [] },
  });

  const { isLoading, isError, prefectures, refetch } = usePrefecture();

  const getSelectedPrefecture = (selected: boolean[]): Prefecture[] => {
    return Object.keys(selected)
      .filter((code) => {
        // 選択されている都道府県のみのcode返す
        return selected[Number(code)];
      })
      .map((code) => {
        return prefectures.find(
          (prefecture) => prefecture.code === Number(code)
        )!;
      });
  };

  if (isError) {
    return (
      <ErrorBox
        message="都道府県の読み込みに失敗しました。時間をおいて再度お試しください。"
        retry={true}
        onRetry={refetch}
        retryText="読み込み"
      />
    );
  }
  return (
    <div className={className}>
      <h2 className={styles.header}>都道府県を選択してください</h2>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <form>
          <Controller
            control={control}
            name={`selected`}
            render={({ field }) => (
              <div className={styles.wrapper}>
                <div className={styles.list}>
                  {prefectures.map((prefecture) => (
                    <LabeledCheckbox
                      {...field}
                      key={prefecture.code}
                      label={prefecture.name}
                      value={prefecture.code}
                      defaultChecked={false}
                      className={styles.checkbox}
                      onChange={(e) => {
                        setValue(
                          `selected.${prefecture.code}`,
                          e.target.checked
                        );

                        if (onChangePrefecture) {
                          const selected = field.value;
                          onChangePrefecture(
                            {
                              prefecture,
                              checked: e.target.checked,
                            },
                            getSelectedPrefecture(selected)
                          );
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          />
        </form>
      )}
    </div>
  );
};

export default PrefectureSelector;
