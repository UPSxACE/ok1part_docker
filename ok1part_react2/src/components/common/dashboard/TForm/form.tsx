export interface IFormProps {
  children: React.ReactNode;
  onSubmit?: Function;
  id?: string;
}

export default function Form({
  children,
  onSubmit = () => {},
  id,
}: IFormProps) {
  return (
    <form
      id={id || 'ok1part-form'}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      {children}
    </form>
  );
}

/*
EXAMPLE:

// set default value sync
function App({ values }) {
  useForm({
    values  // will get updated when values props updates       
  })
}

function App() {
  const values = useFetch('/api');
  
  useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    values, // will get updated once values returns
  })
}
*/
