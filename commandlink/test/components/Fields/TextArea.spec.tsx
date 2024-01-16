import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { TextAreaField } from '../../../src/components/Fields/Index';
import { FieldType } from '../../../src/Interfaces/types';

const mockStore = configureMockStore();

const fieldRequired = {
    id: "reason",
    placeholder: "Describe why you are a good fit for the job you are applying for.",
    type: FieldType.TextArea,
    required:  {
      value: true,
      message: "First Name is required"
   },
};

const fieldNoRequired = {
  id: "reason",
  placeholder: "Describe why you are a good fit for the job you are applying for.",
  type: FieldType.TextArea,
  required:  {
    value: false,
    message: "First Name is required"
 },
};

const error = {
  "reason": {
    message: "First Name is required"
  }
};

const store = mockStore({
  form: { fieldValues: {
    reason: "Text Test"
  } },
});


describe('TextArea Component', () => {
  it('renders correctly', () => {

    render(
      <Provider store={store}>
        <TextAreaField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const input = screen.getByRole('textbox', { name: 'reason' });
    expect(input).toBeTruthy();
  });

  it('handles change event correctly', () => {

    const { getByLabelText } = render(
      <Provider store={store}>
        <TextAreaField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    const input = screen.getByTestId('reason'); 
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(store.getActions()).toEqual([
      { type: 'form/updateFieldValue', payload: { fieldId: 'reason', value: 'Hello' } },
    ]);
  });

  it('renders correctly when isSubmitted is true', () => {
    render(
      <Provider store={store}>
        <TextAreaField field={fieldRequired} register={() => {}} errors={{}} isSubmitted={true} />
      </Provider>
    );

    const inputValue = screen.getByTestId('reason').textContent;

    expect(inputValue).toBe('Text Test');
  });

  it('check required aria element', () => {
    const { container } = render(
      <Provider store={store}>
        <TextAreaField field={fieldNoRequired} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );
    expect(container.querySelector('[aria-required="false"]')).toBeTruthy();
  });

  it('check error message when input is required', () => {
    render(
      <Provider store={store}>
        <TextAreaField field={fieldNoRequired} register={() => {}} errors={error} isSubmitted={false} />
      </Provider>
    );
    const errorText = screen.getByTestId('errorMessage-reason').textContent;
    expect(errorText).toBe("First Name is required");
  });

});