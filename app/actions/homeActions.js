import * as types from './types';

export function scanQR() {
    return {
        type: types.SCAN_QR,
    };
}

export function scanQRFailed() {
    return {
        type: types.SCAN_QR_FAILED
    };
}

export function onScanQRResponse(response) {
    return {
        type: types.SCAN_QR_RESPONSE,
        response
    };
}

export function enableLoader() {
    return {
        type: types.LOGIN_ENABLE_LOADER
    };
}

export function disableLoader() {
    return {
        type: types.LOGIN_DISABLE_LOADER
    };
}
