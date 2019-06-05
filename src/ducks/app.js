import { Actions } from "react-native-router-flux";
import api from '../services/api'
import reactotron from "reactotron-react-native";
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage'
/*
 * Action types
 */
export const Types = {
    DEVICE_ID: "app/DEVICE_ID",
    IS_LOADING: "app/IS_LOADING"
};

/*
 * Reducer
 
 */
const INITIAL_STATE = {
    device_id: null,
    isLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.DEVICE_ID:
            return { ...state, device_id: action.payload };
        case Types.IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export const Creators = {
    /// DEFAULT SETERS HERE
    setDeviceId: deviceId => ({
        type: Types.DEVICE_ID,
        payload: deviceId
    }),
    setIsLoading: isLoading => ({
        type: Types.IS_LOADING,
        payload: isLoading
    }),
    getDeviceId: () => (dispatch, getState) => {
        dispatch(Creators.setIsLoading(true))

        AsyncStorage.getItem('@upvotes:deviceid')
            .then(res => {
                if (res)
                    dispatch([
                        Creators.setDeviceId(res),
                        Creators.setIsLoading(false)
                    ])
                else {
                    const deviceData = DeviceInfo.getUniqueID();
                    AsyncStorage.setItem('@upvotes:deviceid', deviceData)
                        .then(() => dispatch([
                            Creators.setDeviceId(deviceData),
                            Creators.setIsLoading(false)
                        ]))
                }
            })
    }
}