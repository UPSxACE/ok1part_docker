import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

interface ReferenceObj {
  id: string;
  name: string;
}

export type ApiReferenceAll = ReferenceObj[];
interface FormObj {
  _id: string;
  title: string;
  reference: string;
  editor: string;
  status: number;
  version: string;
  description?: string;
  questions?: any[];
  comments?: any[];
}

export type ApiFormAll = FormObj[];

interface FormIdInfoObj {
  _id: string;
  title: string;
  description: string;
  reference: { [key: string]: any };
  dapproval: string;
  ownerForm: { [key: string]: any };
  state: number;
  comments: { [key: string]: any };
}

export type ApiFormIdInfo = FormIdInfoObj;

interface ApprovalStatusObj {
  fkform: { [key: string]: any };
  fkoperator: { [key: string]: any };
  state: 1 | 2;
}

export type ApiFormIdApprovalStatus = ApprovalStatusObj[];

export interface CommentObj {
  id: string;
  username: string;
  date: Date;
  message: string;
  status: number;
}

export interface ICommentSectionObj {
  id: string;
  username: string;
  status: number;
  comments: CommentObj[];
}

export type ApiFormComments = ICommentSectionObj[];

export const instance = axios.create({
  baseURL: 'http://localhost/api', //'http://localhost:9000',
  //timeout: 3000, no timeout for now
});

const api = {
  initInterceptor: () => initInterceptor(instance),
  fetcher: instance,
  postLogin: '/auth/login',
  postRegister: '/auth/register',
  getReasons: '/reason/all',
  getShifts: '/shift/all',
  getPermissions: '/identity/permissions',
  getPublicInfo: '/identity/public-info',
  getUap: '/uap/all',
  getFamily: '/family/all',
  getReferences: (uap: String, family: String) => '/reference/all',
  //`/reference/all?uap=${uap}&family=${family}`,
  getForms: '/eform/all',
  getFormByFamilyReferenceState: (
    family: String,
    reference: String,
    state: Number
  ) => `/eform/all?family=${family}&reference=${reference}&state=${state}`,
  getFormInfo: (id: string) => '/eform/' + id + '/info',
  getFormQuestions: (id: string) => '/eform/' + id + '/questions',
  getFormComments: (id: string) => '/eform/' + id + '/comments',
  getFormApprovalStatus: (id: string) => '/eform/' + id + '/approval-cycle',
  getAllAvailableForms: '/eform/all?state=4',
  getAllFormAnswers: '/dform/all',
  postNewForm: '/eform/create',
  postNewUap: '/uap/register-uap',
  postNewFamily: '/family/create',
  postNewReference: '/reference/create',
  postFormIdSendForApproval: (id: string) =>
    '/eform/' + id + '/send-for-approval',
  postFormDiscard: (id: string) => '/eform/' + id + '/discard',
  postFormApprove: (id: string) => '/eform/' + id + '/approve',
  postFormUnapprove: (id: string) => '/eform/' + id + '/unapprove',
  postFormAnswer: (id: string) => '/dform/' + id + '/answer',
  postNewReason: '/reason/create',
  postNewShift: '/shift/create',
  patchFormQuestions: (id: string) => '/eform/' + id + '/questions',
  patchFormComments: (id: string) => '/eform/' + id + '/comments',
  patchFormHeader: (id: string) => '/eform/' + id + '/info',

  /*
  // FIXME - Code used for old tests:
  getForms: (requestConfig: AxiosRequestConfig) => {
    return instance.get('/data', requestConfig);
  },
  */
};

function initInterceptor(instance: AxiosInstance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const host = window.location.host;
      const subdomain = host.split('.')[0];

      config.headers = Object.assign({}, config.headers, {
        Subdomain: subdomain,
      });

      // Check if user has an access token already
      const accessToken = localStorage.getItem('accessToken');
      // In case he has, add it to the request header
      if (accessToken) {
        // DEBUG:
        //console.log(accessToken);
        config.headers = Object.assign({}, config.headers, {
          Authorization: 'Bearer ' + accessToken,
        });
      }
      return config;
    },
    function (error: AxiosError) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}

export function checkInvalidToken(error: AxiosError) {
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
      localStorage.removeItem('username');
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
    localStorage.removeItem('username');
  }
}

export default api;
