import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import { Dispatch, SetStateAction } from 'react';

export default function useChangeRuleFuncs({
  fieldsArray,
  setFieldsArray,
  id,
  ruleIndex,
}: {
  fieldsArray: FieldsArray;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
  id: number;
  ruleIndex: number;
}) {
  const _rules = fieldsArray?.[id - 1]?.rules;
  const current = _rules?.[ruleIndex]?.value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);

      if (!newFieldsArray[id - 1].rules) {
        newFieldsArray[id - 1].rules = [];
      }

      const rules = newFieldsArray[id - 1].rules as ValidationType[];

      rules[ruleIndex].value = value;

      return newFieldsArray;
    });
  };

  function deleteDependency() {
    setFieldsArray((currentState) => {
      const newArray: FieldsArray = Object.assign([], currentState);

      if (typeof ruleIndex === 'number') {
        newArray[id - 1].rules?.splice(ruleIndex, 1);
      }

      return newArray;
    });
  }

  return { current, handleChange, deleteDependency };
}
