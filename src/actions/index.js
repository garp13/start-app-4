import * as ActionTypes from "../constants/ActionType";

export const actGetWeather = (nowWeather,tomorrow) => {
    return{
        type: ActionTypes.GET_WEATHER,
        nowWeather,
        tomorrow
        
        // country
    }
}