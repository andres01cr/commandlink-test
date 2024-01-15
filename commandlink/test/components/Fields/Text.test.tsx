import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Text from './Text';

const mockStore = configureMockStore();

describe('Text Component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'text', placeholder: 'Enter text', type: 'text' };

    const { getByLabelText } = render(
      <Provider store={store}>
        <Text field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    expect(getByLabelText('text')).toBeInTheDocument();
  });

  it('handles change event correctly', () => {
    const store = mockStore({
      form: { fieldValues: {} },
    });
    const field = { id: 'text', placeholder: 'Enter text', type: 'text' };

    const { getByLabelText } = render(
      <Provider store={store}>
        <Text field={field} register={() => {}} errors={{}} isSubmitted={false} />
      </Provider>
    );

    fireEvent.change(getByLabelText('text'), { target: { value: 'Hello' } });

    expect(store.getActions()).toEqual([
      { type: 'form/updateFieldValue', payload: { fieldId: 'text', value: 'Hello' } },
    ]);
  });
});