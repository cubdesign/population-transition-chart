import styles from "@/styles/components/PrefectureSelector.module.scss";
import { getPrefectures, Prefecture } from "@/services/resasApi";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import LabeledCheckbox from "@/components/ui/LabeledCheckbox";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormInput = {
  prefectures: boolean[];
};

const schema = yup.object({
  prefectures: yup.array().of(yup.boolean()),
});

export type PrefectureSelectorProps = {
  onChangePrefecture?: (
    change: { prefecture_id: number; checked: boolean },
    ids: number[]
  ) => void;
};

const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  onChangePrefecture,
}) => {
  const { control, handleSubmit, setValue } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: { prefectures: [] },
  });

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const { isLoading } = useQuery({
    queryKey: [`prefectures`],
    queryFn: getPrefectures,
    onSuccess: (data) => {
      setPrefectures(data.result);
    },
  });

  const getSelectedPrefectureIds = (prefectures: boolean[]): number[] => {
    const prefecture_ids = Object.keys(prefectures)
      .filter((key) => {
        return prefectures[Number(key)];
      })
      .map((key) => {
        return Number(key);
      });
    return prefecture_ids;
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      console.log(getSelectedPrefectureIds(data.prefectures));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Prefectures</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name={`prefectures`}
            render={({ field }) => (
              <div className={styles.list}>
                {prefectures.map((prefecture) => (
                  <LabeledCheckbox
                    {...field}
                    key={prefecture.prefCode}
                    label={prefecture.prefName}
                    value={prefecture.prefCode}
                    defaultChecked={false}
                    onChange={(e) => {
                      setValue(
                        `prefectures.${prefecture.prefCode}`,
                        e.target.checked
                      );

                      if (onChangePrefecture) {
                        onChangePrefecture(
                          {
                            prefecture_id: prefecture.prefCode,
                            checked: e.target.checked,
                          },
                          getSelectedPrefectureIds(field.value)
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
