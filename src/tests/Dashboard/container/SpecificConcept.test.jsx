import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import {
  SpecificConcept,
  mapStateToProps,
} from '../../../components/dashboard/container/SpecificConcept';
import Authenticated from '../../__mocks__/fakeStore';
import { existingConcept } from '../../__mocks__/concepts';

jest.mock('../../../components/dashboard/components/dictionary/AddDictionary');
const store = createMockStore(Authenticated);
describe('Dashboard SpecificConcept Component', () => {
  it('should render without crashing', () => {
    const props = {
      fetchConceptsActionTypes: jest.fn(),
      concepts: [],
      isFetching: false,
      clearSources: jest.fn(),
      hasMore: false,
    };
    const params = {
      match: {
        params: {
          organization: 'owner',
          name: 'name',
        },
      },
    };
    const wrapper = mount(<MemoryRouter>
      <SpecificConcept {...props} match={{ params }} />
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render fetch specific concepts', () => {
    const props = {
      fetchConceptsActionTypes: jest.fn(),
      concepts: [existingConcept],
      isFetching: true,
    };
    const params = {
      match: {
        params: {
          organization: 'owner',
          name: 'name',
        },
      },
    };
    const wrapper = mount(<MemoryRouter><Provider store={store}>
      <SpecificConcept {...props} match={{ params }} />
    </Provider></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render preloader spinner', () => {
    const props = {
      fetchConceptsActionTypes: jest.fn(),
      concepts: [],
      isFetching: true,
    };
    const params = {
      match: {
        params: {
          organization: 'owner',
          name: 'name',
        },
      },
    };
    const wrapper = mount(<MemoryRouter>
      <SpecificConcept {...props} match={{ params }} />
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should search for a specific concept', () => {
    const props = {
      fetchConceptsActionTypes: jest.fn(),
      concepts: [existingConcept],
      isFetching: true,
      clearConcepts: jest.fn(),
    };
    const params = {
      match: {
        params: {
          organization: 'owner',
          nameType: 'nameType',
        },
      },
    };
    const wrapper = mount(<MemoryRouter><Provider store={store}>
      <SpecificConcept {...props} match={{ params }} />
    </Provider></MemoryRouter>);
    const event = { target: { name: 'searchInput', value: 'drug' } };
    wrapper.find('#search').simulate('change', event);
    wrapper.find('.search-bar-wrapper').simulate('submit', {
      preventDefault: () => {},
    });
  });

  it('should not search for un existing concept', () => {
    const props = {
      fetchConceptsActionTypes: jest.fn(),
      concepts: [],
      isFetching: true,
      clearConcepts: jest.fn(),
    };
    const params = {
      match: {
        params: {
          organization: 'owner',
          nameType: 'nameType',
        },
      },
    };
    const wrapper = mount(<MemoryRouter>
      <SpecificConcept {...props} match={{ params }} />
    </MemoryRouter>);
    const event = { target: { name: 'searchInput', value: '' } };
    wrapper.find('#search').simulate('change', event);
    wrapper.find('.search-bar-wrapper').simulate('submit', {
      preventDefault: () => {},
    });
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      concepts: { concepts: [], loading: false },
    };
    expect(mapStateToProps(initialState).concepts).toEqual([]);
    expect(mapStateToProps(initialState).isFetching).toEqual(false);
  });

  it('should handle change in path', () => {
    const props = {
      fetchConceptsActionTypes: jest.fn(),
      concepts: [],
      isFetching: true,
    };

    const params = {
      match: {
        params: {
          organization: 'owner',
          name: 'name',
        },
      },
    };
    const wrapper = mount(<SpecificConcept {...props} match={{ params }} />);
    const pathName = 'dictionary';
    const name = wrapper.instance().handlePath('/dashboard/concepts/', pathName);
    expect(name).toEqual('dictionary');
    const sourceName = wrapper.instance().handlePath('/dashboard/sources', pathName);
    expect(sourceName).toEqual('sources');
  });
});

