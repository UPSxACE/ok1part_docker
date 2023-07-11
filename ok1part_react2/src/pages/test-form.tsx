import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import DashboardWrapper from '@/components/common/dashboard/dashboard-wrapper';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import FormsAnswerContent from '@/components/forms-answer/forms-answer-content';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function TestForm() {
  const id = 1;

  const header: IFormHeaderBaseProps = {
    form_name: `Answer form ${id}`,
    form_description:
      'This is a sample. Description of the form will appear here.',
  };

  const fields: FieldsArray = [
    {
      id_: 'name_example',
      label: 'Short Answer',
      type: 'short-answer',
      registerRef: 'name_example',
      rules: [],
    },
    {
      id_: 'name_example2_1',
      label: 'Long Example',
      type: 'long-answer',
      registerRef: 'name_example',
      rules: [],
    },
    {
      id_: 'name_example2_2',
      label: 'Toggle Label Example',
      type: 'toggle-label',
      registerRef: 'name_example',
      rules: [],
    },
    {
      id_: 'name_example3',
      label: 'Radio Example',
      type: 'radio',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        options: [
          { id: '_1', label: 'Option 1' },
          { id: '_2', label: 'Option 2' },
          { id: '_3', label: 'Option 3' },
          { id: '_4', label: 'Option 4' },
        ],
      },
    },
    {
      id_: 'name_example4_1',
      label: 'Radio Color Example',
      type: 'radio-color',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        options: [
          { id: '_1', label: '#000' },
          { id: '_2', label: '#fff' },
          { id: '_3', label: '#ededed' },
          { id: '_4', label: '#e5e5e5' },
        ],
      },
    },
    {
      id_: 'name_example4_2',
      label: 'Select Example',
      type: 'select',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        options: [
          { id: '_1', label: 'Option 1' },
          { id: '_2', label: 'Option 2' },
          { id: '_3', label: 'Option 3' },
          { id: '_4', label: 'Option 4' },
        ],
      },
    },
    {
      id_: 'name_example5',
      label: 'Radio Image Example',
      type: 'radio-image',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        options: [
          {
            id: '_1',
            label: '/samples/sample1.jpg',
          },
          {
            id: '_2',
            label: '/samples/sample2.jpg',
          },
          {
            id: '_3',
            label: '/samples/sample3.jpg',
          },
          {
            id: '_4',
            label: '/samples/sample4.jpg',
          },
        ],
      },
    },
    {
      id_: 'name_example6_1',
      label: 'Range Example',
      type: 'range',
      registerRef: 'name_example',
      rules: [
        //{ id_: 'onlyNumbers', message: 'This field only accepts numbers.' },
      ],
    },
    {
      id_: 'name_example6_2',
      label: 'Slider Example',
      type: 'slider',
      registerRef: 'name_example',
      fieldConfig: {
        scaleStart: 1,
        scaleEnd: 25,
      },
    },
    {
      id_: 'name_example6_3',
      label: 'Slider Label Example',
      type: 'slider-label',
      registerRef: 'name_example',
      fieldConfig: {
        columns: [
          { id: '_1', label: 'Very bad' },
          { id: '_2', label: 'Bad' },
          { id: '_3', label: 'Average' },
          { id: '_4', label: 'Good' },
          { id: '_5', label: 'Very Good' },
        ],
      },
    },
    {
      id_: 'name_example6_4',
      label: 'Scale Example',
      type: 'scale',
      registerRef: 'name_example',
      fieldConfig: {
        options: [
          { id: '_1', label: 'Option 1' },
          { id: '_2', label: 'Option 2' },
          { id: '_3', label: 'Option 3' },
          { id: '_4', label: 'Option 4' },
          { id: '_5', label: 'Option 5' },
        ],
      },
    },
    {
      id_: 'name_example7',
      label: 'Checkbox Question Example',
      type: 'multiple-checkbox',
      registerRef: 'name_example',
      rules: [],
      deps: [
        {
          typeOfCondition: 'parent-compare',
          questionIndex: 7,
          comparison: { type: 'minValue', comparisonValue: 6 },
        },
      ],
      fieldConfig: {
        options: [
          { id: '_1', label: 'Option 1' },
          { id: '_2', label: 'Option 2' },
          { id: '_3', label: 'Option 3' },
          { id: '_4', label: 'Option 4' },
        ],
      },
    },
    {
      id_: 'name_example8',
      label: 'Radio Grid Example',
      type: 'grid-radio',
      registerRef: 'name_example',
      rules: [],
      deps: [
        {
          typeOfCondition: 'parent-compare',
          questionIndex: 7,
          comparison: { type: 'minValue', comparisonValue: 6 },
        },
      ],
      fieldConfig: {
        rows: [
          { id: '_r1', label: 'Row 1' },
          { id: '_r2', label: 'Row 2' },
        ],
        columns: [
          { id: '_c1', label: 'Column 1' },
          { id: '_c2', label: 'Column 2' },
          { id: '_c3', label: 'Column 3' },
        ],
      },
    },
    {
      id_: 'name_example9_1',
      label: 'Checkbox Grid Example',
      type: 'grid-checkbox',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        rows: [
          { id: '_r1', label: 'Row 1' },
          { id: '_r2', label: 'Row 2' },
        ],
        columns: [
          { id: '_c1', label: 'Column 1' },
          { id: '_c2', label: 'Column 2' },
          { id: '_c3', label: 'Column 3' },
        ],
      },
    },
    {
      id_: 'name_example9_2',
      label: 'Toggle Grid Example',
      type: 'grid-toggle',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        rows: [
          { id: '_r1', label: 'Row 1' },
          { id: '_r2', label: 'Row 2' },
        ],
        columns: [
          { id: '_c1', label: 'Column 1' },
          { id: '_c2', label: 'Column 2' },
          { id: '_c3', label: 'Column 3' },
        ],
      },
    },
    {
      id_: 'name_example10_1',
      label: 'Advanced Grid Example',
      type: 'grid-advanced',
      registerRef: 'name_example',
      rules: [],
      fieldConfig: {
        columns: [
          { id: '_c1', label: 'Column 1' },
          { id: '_c2', label: 'Column 2' },
          { id: '_c3', label: 'Column 3' },
        ],
        rows: [
          { id: '_r1', label: 'Row 1', type: 'multiple-checkbox' },
          { id: '_r2', label: 'Row 2', type: 'radio' },
          { id: '_r3', label: 'Row 3', type: 'toggle-label' },
          {
            id: '_r4',
            label: 'Row 4',
            type: 'select',
            fieldConfig: {
              options: [
                { id: '_1', label: 'Option 1' },
                { id: '_2', label: 'Option 2' },
                { id: '_3', label: 'Option 3' },
                { id: '_4', label: 'Option 4' },
              ],
            },
          },
          { id: '_r5', label: 'Row 5', type: 'short-answer' },
        ],
      },
    },
    {
      id_: 'name_example10_2',
      label: 'Date Example',
      type: 'date',
      registerRef: 'name_example',
      rules: [],
    },
    {
      id_: 'name_example11',
      label: 'Date Time Example',
      type: 'datetime',
      registerRef: 'name_example',
      rules: [],
    },
  ];

  const defaultValues = {
    name_example: 'Default Value',
  };

  return (
    <DashboardWrapper
      sx={{
        maxWidth: 900,
        alignItems: 'center',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <FormsAnswerContent
        header={header}
        fields={fields}
        defaultValues={defaultValues}
      />
    </DashboardWrapper>
  );
}

TestForm.getLayout = (page: any) =>
  getDashboardLayout(page, {
    /*header: {
      title: 'Forms',
      rightText: 'Dashboard/Forms',
    },*/
    sx: { alignItems: 'center', paddingY: 8 },
  });

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
