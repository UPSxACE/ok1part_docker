import Date, { IDateAnswerModeProps, IDateEditModeProps } from './date';

interface IDateTimeProps {
  pickmode: 'datetime';
}

export default function DateTimeComponent(
  props: IDateAnswerModeProps | IDateEditModeProps
) {
  const newProps:
    | (IDateTimeProps & IDateAnswerModeProps)
    | (IDateTimeProps & IDateEditModeProps) = {
    ...props,
    pickmode: 'datetime',
  };

  return <Date {...newProps} />;
}
