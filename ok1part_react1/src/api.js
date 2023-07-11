import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/api',
  //timeout: 3000, no timeout for now
});

const api = {
  initInterceptor: () => initInterceptor(instance),
  login: (credentials) =>
    instance.post('/auth/login', credentials).then((response) => {
      // DEBUG: console.log('RESPONSE DATA');
      // DEBUG: console.log(response.data);
      return response;
    }),
  getCompanySettings: (CancelToken) =>
    instance.get('/client-config', CancelToken).then((response) => response),
  updateCompanySettings: (newSettings) => {
    // Debug: console.log('NS', newSettings);

    return instance.patch('/client-config', newSettings).then((response) => {
      // DEBUG: console.log('RESPONSE DATA');
      // DEBUG: console.log(response.data);
      return response;
    });
  },
  getRolesData: (CancelToken) =>
    instance
      .get('/admin_client/ClientsRoleAPI/findAll', CancelToken)
      .then((response) => {
        return response;
      }),
  getDefaultCycle: (CancelToken) =>
    instance
      .get('/approval-cycle/default-cycle', CancelToken)
      .then((response) => {
        return response;
      }),
  getAvailableOperators: (CancelToken) =>
    instance
      .get('/approval-cycle/available-operators', CancelToken)
      .then((response) => {
        return response;
      }),
  removeFromDefaultCycle: (requestData) =>
    instance
      .delete('/approval-cycle/remove-from-cycle', { data: requestData })
      .then((response) => {
        return response;
      }),

  addToDefaultCycle: (requestData) =>
    instance
      .post('/approval-cycle/add-to-cycle', requestData)
      .then((response) => {
        // DEBUG: console.log('RESPONSE DATA');
        // DEBUG: console.log(response.data);
        return response;
      }),
  createRole: (roleData) => {
    // Debug: console.log('UD', userData);
    return instance
      .post('/admin_client/ClientsRoleAPI/create', roleData)
      .then((response) => response);
  },
  updateRole: (newRoleData) =>
    instance
      .post('/admin_client/ClientsRoleAPI/update', newRoleData)
      .then((response) => {
        // DEBUG: console.log('RESPONSE DATA');
        // DEBUG: console.log(response.data);
        return response;
      }),
  deleteRole: (roleId) =>
    instance
      .delete(`/admin_client/ClientsRoleAPI/delete/${roleId}`)
      .then((response) => response),
  register: (userData) => {
    // Debug: console.log('UD', userData);
    return instance
      .post('/auth/register', userData)
      .then((response) => response);
  },
  createUser: (userData) => {
    // Debug: console.log('UD', userData);
    return instance.post('/user/create', userData).then((response) => response);
  },
  getUsers: (CancelToken) =>
    instance.get('/user/all', CancelToken).then((response) => {
      // Debug: console.log(response);
      return response;
    }),
  addRoleToUser: (userId, roleName) => {
    return instance
      .patch(`/user/${userId}/add-role/${roleName}`)
      .then((response) => response);
  },

  deleteRoleFromUser: (userId, roleName) => {
    return instance
      .patch(`/user/${userId}/remove-role/${roleName}`)
      .then((response) => response);
  },
  getWhitelistedIps: (CancelToken) =>
    instance
      .get('/client-config/whitelisted-ips', CancelToken)
      .then((response) => {
        // Debug: console.log(response);
        return response;
      }),
  whitelistIp: (ip) =>
    instance
      .post(`/client-config/whitelist-ip?ip=${ip}`)
      .then((response) => response),
  removeWhitelistedIp: (ip) =>
    instance
      .delete(`/client-config/remove-whitelisted-ip?ip=${ip}`)
      .then((response) => response),
};

export default api;

function initInterceptor(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Check if user has an access token already
      const accessToken = localStorage.getItem('accessToken');
      // In case he has, add it to the request header
      if (accessToken) {
        // DEBUG:
        //console.log(accessToken);
        config.headers = {
          ...config.headers,
          Authorization: 'Bearer ' + accessToken,
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}

export function checkInvalidToken(error) {
  // If this returns true, the component that called this function should redirect to login, or reload page
  // If this returns false, the component should handle the error in a different way

  // Check if the error is because of invalid JWT token
  if (error?.response?.status === 401) {
    // If yes, this needs to true in the end

    // But first check if user has an access token in the local storage
    const accessToken = localStorage.getItem('accessToken');
    // In case he has, remove it
    if (accessToken) {
      localStorage.removeItem('accessToken');
    }

    return true;
  }

  return false;
}

export function removeAccessToken() {
  // But first check if user has an access token in the local storage
  const accessToken = localStorage.getItem('accessToken');
  // In case he has, remove it
  if (accessToken) {
    localStorage.removeItem('accessToken');
  }
}
