import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Form from './Form';

const mockStore = configureMockStore();

describe('Form Component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      form: { fieldSetData: [] },
    });

    const { getByLabelText } = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(getByLabelText('formTitle')).toBeInTheDocument();
  });

  it('submits form correctly', () => {
    const store = mockStore({
      form: { fieldSetData: [] },
    });

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.click(getByText('Submit'));

    expect(getByLabelText('formTitle')).toHaveTextContent('Form Submitted');
  });
});