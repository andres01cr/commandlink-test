import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { SelectField } from '../../../src/components/Fields/Index';
import { FieldType } from '../../../src/Interfaces/types';
const mockStore = configureMockStore();
const fieldRequired = {
    id: "jobTitle",
    options: [
      "Engineer - lead",
      "Engineer - mid level",
      "Engineer - junion",
      "Engineer - front end focused",
      "Engineer - backend focused",
      "Engineer - full stack"
    ],
    placeholder: "Please select job title",
    type: FieldType.Select,
    required:  {
      value: true,
      message: "Job title is required"
    }
  };

  const error = {
    "jobTitle": {
      message: "Job title is required"
    }
  };

  const fieldNoRequired = {
    id: "jobTitle",
    options: [
      "Engineer - lead",
      "Engineer - mid level",
      "Engineer - junion",
      "Engineer - front end focused",
      "Engineer - backend focused",
      "Engineer - full stack"
    ],
    placeholder: "Please select job title",
    type: FieldType.Select,
    required:  {
      value: false,
      message: "Job title is required"
    }
  };
  
  const store = mockStore({
    form: { fieldValues: {
      jobTitle: "Text Test"
    } },
  });

describe('Select Component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <SelectField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const select = screen.getByRole('combobox', { name: 'jobTitle' });

    expect(select).toBeTruthy();
  });

  it('handles change event correctly', () => {

    render(
      <Provider store={store}>
        <SelectField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const comboBox = screen.getByTestId('jobTitle'); 
    fireEvent.change(comboBox, { target: { value: 'Engineer - lead' } });

    expect(store.getActions()).toEqual([
      { type: 'form/updateFieldValue', payload: { fieldId: 'jobTitle', value: 'Engineer - lead' } },
    ]);
  });

  it('displays options correctly', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <SelectField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const comboBox = screen.getByTestId('jobTitle'); 
    fireEvent.click(comboBox);

    expect(getByText('Engineer - lead')).toBeTruthy();
    expect(getByText('Engineer - mid level')).toBeTruthy();
    expect(getByText('Engineer - junion')).toBeTruthy();
    expect(getByText('Engineer - front end focused')).toBeTruthy();
    expect(getByText('Engineer - backend focused')).toBeTruthy();
    expect(getByText('Engineer - full stack')).toBeTruthy();

  });


  it('renders correctly when isSubmitted is true', () => {
    render(
      <Provider store={store}>
        <SelectField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={true} />
      </Provider>
    );

    const inputValue = screen.getByTestId('jobTitle').textContent;

    expect(inputValue).toBe('Text Test');
  });

  it('check required aria element', () => {
    const { container } = render(
      <Provider store={store}>
        <SelectField field={fieldNoRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );
    expect(container.querySelector('[aria-required="false"]')).toBeTruthy();
  });

  it('check error message when input is required', () => {
    render(
      <Provider store={store}>
        <SelectField field={fieldRequired} register={() => {}} errors={error} isSubmitted={false} />
      </Provider>
    );
    const errorText = screen.getByTestId('errorMessage-jobTitle').textContent;
    expect(errorText).toBe("Job title is required");
  });
});