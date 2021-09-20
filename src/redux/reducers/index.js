import cookie from 'js-cookie';

const reducer = (
  state = {
    isAuthUser: !!cookie.get('token'),
    user: cookie.get('user') || {},
  },
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthUser: true, login: action.payload };
    case 'PROVINCES':
      return { ...state, provinces: action.payload };
    case 'PROVINCES_FILTER':
      return { ...state, provincesFilter: action.payload };
    case 'CITIES':
      return { ...state, cities: action.payload };
    case 'CITIES_FILTER':
      return { ...state, citiesFilterFromProvinces: action.payload };
    case 'CITIES_SEARCH':
      return { ...state, searchCities: action.payload };
    case 'LOGOUT':
      cookie.remove('token');
      cookie.remove('user');
      return { ...state, isAuthUser: false };

    default:
      return state;
  }
};

export default reducer;
