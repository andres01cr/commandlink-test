import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { TextField } from '../../../src/components/Fields/Index';
import { FieldType } from '../../../src/Interfaces/types';

const mockStore = configureMockStore();
const fieldRequired = {
  id: "firstName",
  placeholder: "First name",
  required:  {
    value: true,
    message: "First Name is required"
 },
  type: FieldType.Text
};

const fieldNoRequired = {
  id: "firstName",
  placeholder: "First name",
  required:  {
    value: false,
    message: "First Name is required"
 },
  type: FieldType.Text
};

const error = {
  "firstName": {
    message: "First Name is required"
  }
};

const store = mockStore({
  form: { fieldValues: {
    firstName: "Text Test"
  } },
});

describe('Text Component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <TextField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const input = screen.getByRole('textbox', { name: 'firstName' });
    expect(input).toBeTruthy();
  });

  it('handles change event correctly', () => {
    render(
      <Provider store={store}>
        <TextField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const input = screen.getByTestId('firstName'); 
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(store.getActions()).toEqual([
      { type: 'form/updateFieldValue', payload: { fieldId: 'firstName', value: 'Hello' } },
    ]);
  });

  it('renders correctly when isSubmitted is true', () => {
    render(
      <Provider store={store}>
        <TextField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={true} />
      </Provider>
    );

    const inputValue = screen.getByTestId('firstName').textContent;

    expect(inputValue).toBe('Text Test');
  });

  it('check required aria element', () => {
    const { container } = render(
      <Provider store={store}>
        <TextField field={fieldNoRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );
    expect(container.querySelector('[aria-required="false"]')).toBeTruthy();
  });

  it('check error message when input is required', () => {
    render(
      <Provider store={store}>
        <TextField field={fieldRequired} register={() => {}} errors={error} isSubmitted={false} />
      </Provider>
    );
    const errorText = screen.getByTestId('errorMessage-firstName').textContent;
    expect(errorText).toBe("First Name is required");
  });
});