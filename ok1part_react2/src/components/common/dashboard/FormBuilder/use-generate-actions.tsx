import {
  FieldsArray,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import ActionIconButton from './action-icon-button';
import generateRandomHash from '@/utils/generate-random-hash';

export interface IEditFormAction {
  name: string;
  render: (id: number) => JSX.Element;
}

export type EditFormActionsArray = IEditFormAction[];

export default function useGenerateActions(
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>,
  setDefaultValues: Dispatch<SetStateAction<any>>
) {
  const actionAddQuestion: IEditFormAction = {
    name: 'Add Question',
    render: (id) => {
      return (
        <ActionIconButton
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            addQuestionInPosition(id, e);
          }}
          faIcon={faCirclePlus}
        />
      );
    },
  };

  const actionDeleteQuestion: IEditFormAction = {
    name: 'Action 2',
    render: (id) => {
      return (
        <ActionIconButton
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            deleteQuestionInPosition(id, e);
          }}
          faIcon={faTrash}
        />
      );
    },
  };

  const actionsHeaders: EditFormActionsArray = [actionAddQuestion];

  const actionsFields: EditFormActionsArray = [
    actionAddQuestion,
    actionDeleteQuestion,
  ];

  return { actionsFields, actionsHeaders };

  // Functions...
  function addQuestionInPosition(id: number, e: React.MouseEvent<HTMLElement>) {
    if (typeof id === 'number') {
      setFieldsArray((fieldsArray) => {
        const newArray = Object.assign([], fieldsArray);

        let hashedName = '';
        while (hashedName === '') {
          const newHash = generateRandomHash('new_question', 12);
          if (
            fieldsArray.find((field) => field.id_ === newHash) === undefined
          ) {
            hashedName = newHash;
          }
        }

        const newQuestion: IFieldObject = {
          id_: '_' + hashedName,
          label: '',
          type: 'short-answer',
          registerRef: '',
        };
        newArray.splice(id, 0, newQuestion);
        return newArray;
      });
    }
  }

  function deleteQuestionInPosition(
    id: number,
    e: React.MouseEvent<HTMLElement>
  ) {
    setFieldsArray((fieldsArray) => {
      const newArray = Object.assign([], fieldsArray);
      newArray.splice(id - 1, 1);
      return newArray;
    });
  }
}
