import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TextArea from './TextArea';

const mockStore = configureMockStore();

describe('TextArea Component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'textarea', placeholder: 'Enter text', type: 'textarea' };

    const { getByLabelText } = render(
      <Provider store={store}>
        <TextArea field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    expect(getByLabelText('textarea')).toBeInTheDocument();
  });

  it('handles change event correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'textarea', placeholder: 'Enter text', type: 'textarea' };

    const { getByLabelText } = render(
      <Provider store={store}>
        <TextArea field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    fireEvent.change(getByLabelText('textarea'), { target: { value: 'Hello' } });

    expect(store.getActions()).toEqual([
      { type: 'form/updateFieldValue', payload: { fieldId: 'textarea', value: 'Hello' } },
    ]);
  });
});