import {
  FieldsArray,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';
import generateRandomHash from '@/utils/generate-random-hash';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

export interface IEditFormAction {
  name: string;
  render: () => JSX.Element;
}

export default function useGenerateSideBarActions(
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>,
  setDefaultValues: Dispatch<SetStateAction<any>>
) {
  function SidebarActionButton({
    name,
    label,
  }: {
    name: string;
    label: string;
  }) {
    return (
      <Button
        variant='outlined'
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          addQuestion(name, e);
        }}
        sx={{
          minWidth: 120,
          flex: 1,
        }}
      >
        {label}
      </Button>
    );
  }

  // ANCHOR - question buttons
  const actionAddShortAnswer: IEditFormAction = {
    name: 'Short Answer',
    render: () => {
      return <SidebarActionButton name='short-answer' label='Short Answer' />;
    },
  };
  const actionAddLongAnswer: IEditFormAction = {
    name: 'Long Answer',
    render: () => {
      return <SidebarActionButton name='long-answer' label='Long Answer' />;
    },
  };
  const actionAddRadio: IEditFormAction = {
    name: 'Radio',
    render: () => {
      return <SidebarActionButton name='radio' label='Radio' />;
    },
  };

  const actionButtons: IEditFormAction[] = [
    actionAddShortAnswer,
    actionAddLongAnswer,
    actionAddRadio,
  ];

  return { actionButtons };

  // Functions...
  function addQuestion(type: string, e: React.MouseEvent<HTMLElement>) {
    // ANCHOR - question switch cases
    switch (type) {
      case 'short-answer':
        setFieldsArray((fieldsArray) => {
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

          return fieldsArray.concat([newQuestion]);
        });
        break;
      case 'long-answer':
        setFieldsArray((fieldsArray) => {
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
            type: 'long-answer',
            registerRef: '',
          };

          return fieldsArray.concat([newQuestion]);
        });
        break;
      case 'radio':
        setFieldsArray((fieldsArray) => {
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
            type: 'radio',
            registerRef: '',
            fieldConfig: {
              options: [
                {
                  id: generateRandomHash('new_option', 8),
                  label: '',
                },
              ],
            },
          };

          return fieldsArray.concat([newQuestion]);
        });
        break;
      default:
        return;
    }
  }
}
