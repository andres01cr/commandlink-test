import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Form from '../../src/components/Form/Form';


const mockJsonData = [[{
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
  }],
  {
    "id": "jobTitle",
    "options": [
      "Engineer - lead",
      "Engineer - mid level",
      "Engineer - junion",
      "Engineer - front end focused",
      "Engineer - backend focused",
      "Engineer - full stack"
    ],
    "placeholder": "Please select job title",
    "type": "select",
    "required":  {
      "value": true,
      "message": "Job title is required"
    }
  },
  {
    "id": "reason",
    "placeholder": "Describe why you are a good fit for the job you are applying for.",
    "type": "textarea"
  }];

const mockStore = configureMockStore();

jest.mock('../../src/utils/field-set.json', () => (mockJsonData), { virtual: true });
const store = mockStore({
  form: {
    fieldSetData: mockJsonData,
    fieldValues: {
      firstName: 'First Test',
      lastName: 'Last Test',
      jobTitle: "Engineer - lead",
      reason: 'Reason'
    },
  },
});;

describe('Form component', () => {


  test('renders Form component with initial state', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(screen.getByText('Form CommmandLink')).toBeTruthy();

  });

  test('submits the form successfully', async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(screen.getByText('Form CommmandLink')).toBeTruthy();

    fireEvent.submit(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Form Submitted')).toBeTruthy();
    });
  });

});