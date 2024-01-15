import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Select from './Select';

const mockStore = configureMockStore();

describe('Select Component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'select', placeholder: 'Select an option', type: 'select', options: ['Option1', 'Option2'] };

    const { getByLabelText } = render(
      <Provider store={store}>
        <Select field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    expect(getByLabelText('select')).toBeInTheDocument();
  });

  it('handles change event correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'select', placeholder: 'Select an option', type: 'select', options: ['Option1', 'Option2'] };

    const { getByLabelText } = render(
      <Provider store={store}>
        <Select field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    fireEvent.change(getByLabelText('select'), { target: { value: 'Option1' } });

    expect(store.getActions()).toEqual([
      { type: 'form/updateFieldValue', payload: { fieldId: 'select', value: 'Option1' } },
    ]);
  });

  it('displays options correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'select', placeholder: 'Select an option', type: 'select', options: ['Option1', 'Option2'] };

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Select field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    fireEvent.click(getByLabelText('select'));

    expect(getByText('Option1')).toBeInTheDocument();
    expect(getByText('Option2')).toBeInTheDocument();
  });
});