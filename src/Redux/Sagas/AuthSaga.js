import { types } from '../types';
import { updateAuth } from '../Action/AuthAction';
import { loadingFalse, loadingTrue } from '../Action/isloadingAction';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  forgotPasswordServices,
  googleLogin,
} from '../../Utils/SocialLogin';
import {
  fcmRegService,
  getFbResult,
  logOutFirebase,
  loginService,
  registerService,
  updateProfileServices,
} from '../../Services/AuthServices';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import NavigationService from '../../Services/NavigationService';
import { store } from '../Reducer';
import { statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: data => emailSignUp(data),
  appleID: () => appleIdlogin(),
};

export const loginThunk =
  ({ datas, type }) =>
  async dispatch => {
    console.log(':ibsdbvksdbnvksldvsd', type, datas);
    dispatch(loadingTrue());
    try {
      const getLoginData = loginObject[type];
      const resultData = await getLoginData(datas);
      const { socialData, ok } = { socialData: resultData, ok: true };

      if (ok) {
        const idTokenResult = await getFbResult();
        const jwtToken = idTokenResult.token;

        if (jwtToken) {
          const { data, ok } = await registerService({
            token: jwtToken,
            first_name: datas?.first_name,
            last_name: datas?.last_name,
            email: datas?.email,
            password: datas?.password,
            phone: datas?.number,
            company_name: datas?.company_name,
          });
          console.log('lskdbvlksdbklvsfgdfgdfgdfgdfgbsdklbvklsdbvksd', data);
          if (ok) {
            dispatch(updateAuth(data));
          } else {
            console.log('lskdbvlksdbklvbsdklbvklsdbvksd', data);
            errorMessage(data?.message);
          }
        }
      }
    } catch (error) {
      console.log('🔥 Full Error Object:', JSON.stringify(error, null, 2));

      const errorCode = error?.code || 'UNKNOWN_CODE';
      const errorMsg = error?.message || error.toString();

      switch (errorCode) {
        case statusCodes.SIGN_IN_CANCELLED:
        case '1001':
          errorMessage('Cancelled');
          break;
        case 'UNKNOWN_CODE':
          errorMessage('Cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          errorMessage('Login already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          errorMessage('Play services not available or outdated');
          break;
        case 'auth/email-already-in-use':
          errorMessage('This email is already registered');
          break;
        case 'auth/invalid-credential':
          errorMessage('Invalid or expired login credential');
          break;
        case 'auth/internal-error':
          errorMessage('Cancelled');
          break;
        case appleAuth.Error.CANCELED:
          errorMessage('Apple Sign-In was canceled');
          break;
        // … add more firebase/google/apple codes as needed
        default:
          errorMessage('Cancelled');
          break;
      }
    } finally {
      dispatch(loadingFalse());
    }
  };

export const registerThunk =
  ({ datas }) =>
  async dispatch => {
    console.log('skldbvlksdbvklsdbklvsd', datas);
    dispatch(loadingTrue());
    try {
      const result = await emailLogin(datas);
      const { data, ok } = { data: result, ok: true };

      if (ok) {
        const idTokenResult = await getFbResult();
        const jwtToken = idTokenResult.token;

        if (jwtToken) {
          const { data, ok } = await loginService({ token: jwtToken });
          console.log('Login Data:', data);
          if (ok) {
            dispatch(updateAuth(data));
          } else {
            errorMessage(data?.message);
          }
        }
      }
    } catch (error) {
      const errorStr =
        error?.message?.split(' ')?.slice(1)?.join(' ') ?? error.message;
      errorMessage(errorStr);
      console.log('Register Error:', error.toString());
    } finally {
      dispatch(loadingFalse());
    }
  };

export const logoutThunk = () => async dispatch => {
  try {
    dispatch({ type: types.LogoutType });
    await logOutFirebase();
    console.log('Logged out successfully');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    dispatch(loadingFalse());
  }
};

export const updateProfileThunk = profileData => async dispatch => {
  dispatch(loadingTrue());
  try {
    const { ok, data } = await updateProfileServices(profileData);
    if (ok) {
      dispatch({ type: types.UpdateProfile, payload: data.data });
      // successMessage('Your profile has been updated');
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => {
      dispatch(loadingFalse());
    }, 2000);
  }
};

export const fcmRegisterThunk = token => async () => {
  await fcmRegService(token);
};

export const forgotPasswordThunk = email => async dispatch => {
  try {
    dispatch(loadingTrue());
    await forgotPasswordServices(email);
    successMessage('Password Reset Request has been sent to your mail');
    NavigationService.goBack();
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => {
      dispatch(loadingFalse());
    }, 1000);
  }
};
