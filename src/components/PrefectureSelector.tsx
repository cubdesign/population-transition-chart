import styles from "@/styles/components/PrefectureSelector.module.scss";
import React, { FC } from "react";
import LabeledCheckbox from "@/components/ui/LabeledCheckbox";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import usePrefecture, { Prefecture } from "../hooks/usePrefecture";

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
};

const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  onChangePrefecture,
}) => {
  const { control, handleSubmit, setValue } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: { selected: [] },
  });

  const { isLoading, prefectures } = usePrefecture();

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

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      // console.log(getSelectedPrefecture(data.selected));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div>
      <h2 className={styles.header}>Prefectures</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name={`selected`}
            render={({ field }) => (
              <div className={styles.list}>
                {prefectures.map((prefecture) => (
                  <LabeledCheckbox
                    {...field}
                    key={prefecture.code}
                    label={prefecture.name}
                    value={prefecture.code}
                    defaultChecked={false}
                    onChange={(e) => {
                      setValue(`selected.${prefecture.code}`, e.target.checked);

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
            )}
          />
        </form>
      )}
    </div>
  );
};

export default PrefectureSelector;
