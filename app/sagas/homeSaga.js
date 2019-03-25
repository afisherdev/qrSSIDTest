import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import * as 
import * as navigationActions from 'app/actions/navigationActions';

// Our worker Saga that logins the user
export default function* scanQrAsync() {
    yield put(loginActions.enableLoader());

    //how to call api
    //const response = yield call(loginUser, action.username, action.password);
    //mock response
    const response = { success: true, data: { id: 1 } };

    if (response.success) {
        yield put(loginActions.onLoginResponse(response.data));
        yield put(loginActions.disableLoader({}));
        yield call(navigationActions.navigateToHome);
    } else {
        yield put(loginActions.loginFailed());
        yield put(loginActions.disableLoader({}));
        setTimeout(() => {
            Alert.alert('BoilerPlate', response.Message);
        }, 200);
    }
}
