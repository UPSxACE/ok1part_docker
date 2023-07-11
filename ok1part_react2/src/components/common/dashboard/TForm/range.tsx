import ShortAnswer, {
  IShortAnswerAnswerModeProps,
  IShortAnswerEditModeProps,
} from './short-answer';
import Typography from '@mui/material/Typography';

interface RangeProps {
  min?: number;
  max?: number;
}

export default function Range(
  props: (IShortAnswerAnswerModeProps | IShortAnswerEditModeProps) & RangeProps
) {
  const newProps:
    | IShortAnswerAnswerModeProps
    | (IShortAnswerEditModeProps & RangeProps) = {
    ...props,
    inputMode: 'numeric',
    LeftComponent: () => {
      return (
        <>
          {props.min && (
            <>
              <Typography
                variant='h4'
                component='span'
                sx={(theme) => ({
                  fontSize: '1.5rem',
                  fontWeight: 'lighter',
                  color:
                    props.errors?.[props.name] !== null &&
                    props.errors?.[props.name]?.[0] !== undefined
                      ? `${theme.palette.error.main}`
                      : !props.disabled
                      ? 'black'
                      : '#00000061',
                })}
              >
                {props.min}&nbsp;{'<'}&nbsp;
              </Typography>
            </>
          )}
        </>
      );
    },
    RightComponent: () => {
      return (
        <>
          {props.max && (
            <Typography
              sx={(theme) => ({
                fontSize: '1.5rem',
                fontWeight: 'lighter',
                color:
                  props.errors?.[props.name] !== null &&
                  props.errors?.[props.name]?.[0] !== undefined
                    ? `${theme.palette.error.main}`
                    : !props.disabled
                    ? 'black'
                    : '#00000061',
              })}
              variant='h4'
              component='span'
            >
              &nbsp;{'<'}&nbsp;{props.max}
            </Typography>
          )}
        </>
      );
    },

    // NOTE - Disabled until considered necessary:
    // regexp: /^[0-9]*$/,
    // TODO - Make sure to add the necessary validation rules and behavior for when the answer is created using the manage-forms page
  };

  if (props.mode === 'answer') {
    return <ShortAnswer {...newProps} />;
  }
  if (props.mode === 'edit') {
    return <ShortAnswer {...newProps} />;
  }

  return <></>;
}
