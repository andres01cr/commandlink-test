import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Form from '../../src/components/Form/Form';


const mockJsonData = [{
    "id": "firstName",
    "placeholder": "First name",
    "required":  {
      "value": true,
      "message": "First Name is required"
   },
    "type": "text"
  },
  {
    "id": "lastName",
    "placeholder": "Last name",
    "required":  {
      "value": true,
      "message": "Last Name is required"
   },
    "type": "text"
  }];
const mockStore = configureMockStore();

describe('Form Component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      form: { fieldSetData: [] },
    });
    jest.mock('../../src/utils/field-set.json', () => (mockJsonData), { virtual: true });
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