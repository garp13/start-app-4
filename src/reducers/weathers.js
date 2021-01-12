
import * as ActionType from "../constants/ActionType";

var initialState = {
    icon: "",
    main:'',
    temperatureC: '',
    temperatureK:'',
    city: "Ho Chi Minh",
    country: "VN",
    humidity: '',
    description: '',
    // error: '',
    tomorrow:[
        {
            time:'',
            temperatureC:'',
            icon:'',
        }
    ]
};

const vietsubWeather = [
    ['thunderstorm with light rain', 'Giông bão có mưa nhẹ'],
    ['thunderstorm with rain', 'Giông bão có mưa'],
    ['thunderstorm with heavy rain', 'Giông bão có mưa lớn'],
    ['light thunderstorm', 'Giông bão nhẹ'],
    ['thunderstorm', 'Giông'],
    ['heavy thunderstorm', 'Giông bão lớn'],
    ['ragged thunderstorm', 'Giông bão'],
    ['thunderstorm with light drizzle', 'Giông bão có mưa phùn nhẹ'],
    ['thunderstorm with drizzle', 'Giông bão có mưa phùn'],
    ['thunderstorm with heavy drizzle', 'Giông bão có mưa phùn lớn'],
    ['light intensity drizzle', 'Cường độ nhẹ mưa phùn'],
    ['drizzle', 'Mưa phùn'],
    ['heavy intensity drizzle', 'Cường độ nặng mưa phùn'],
    ['light intensity drizzle rain', 'Cường độ nhẹ mưa phùn'],
    ['drizzle rain', 'Mưa phùn'],
    ['heavy intensity drizzle rain', 'Mưa phùn cường độ lớn'],
    ['shower rain and drizzle', 'Mưa rào và mưa phùn'],
    ['heavy shower rain and drizzle', 'Mưa rào và mưa phùn'],
    ['shower drizzle', 'Mưa phùn tắm'],
    ['light rain', 'Mưa nhỏ'],
    ['moderate rain', 'Mưa vừa'],
    ['heavy intensity rain', 'Mưa lớn'],
    ['very heavy rain', 'Mưa rất lớn'],
    ['extreme rain', 'Mưa cực lớn'],
    ['freezing rain', 'Mưa lạnh'],
    ['light intensity shower rain', 'Cường độ nhẹ mưa rào'],
    ['shower rain', 'Mưa'],
    ['heavy intensity shower rain', 'Mưa rào cường độ lớn'],
    ['ragged shower rain', 'Mưa rào'],
    ['light snow', 'Tuyết nhẹ'],
    ['Snow', 'Tuyết'],
    ['Heavy snow', 'Tuyết rơi nhiều'],
    ['Sleet', 'Tuyết'],
    ['Light shower sleet', 'Mưa rào nhẹ'],
    ['Shower sleet', 'Mưa rào'],
    ['Light rain and snow', 'Mưa nhẹ và tuyết'],
    ['Rain and snow', 'Mưa và tuyết'],
    ['Light shower snow', 'Mưa tuyết nhẹ'],
    ['Shower snow', 'Tuyết'],
    ['Heavy shower snow', 'Mưa tuyết lớn'],
    ['mist', 'Sương mù'],
    ['Smoke', 'Khói'],
    ['Haze', 'Sương mù'],
    ['sand/ dust whirls', 'Bụi xoáy'],
    ['fog', 'Sương mù'],
    ['sand', 'Cát'],
    ['dust', 'Bụi băm'],
    ['volcanic ash', 'Tro núi lửa'],
    ['squalls', 'mưa đá'],
    ['tornado', 'Lốc xoáy'],
    ['clear sky', 'Bầu trời quang đãng'],
    ['few clouds', 'Ít mây'],
    ['scattered clouds', 'Mây rải rác'],
    ['broken clouds', 'Mây tan'],
    ['overcast clouds', 'Mây u ám']
]

const vietsubCity = [
    ["Ho Chi Minh City", "Hồ Chí Minh"],
    ["Turan","Đà Nẵng"],
    ["Hanoi","Hà Nội"],
    ["Hue", "Huế"],
]

const getTomorrow = () => {
    let today = new Date();
    today.setDate(new Date().getDate() + 1);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = String(today.getFullYear());
    return yyyy + '-' + mm + '-' + dd;
}
const weathers = (state = initialState, action) => {
    
    switch(action.type){
        case ActionType.GET_WEATHER:{
            
            state = {
                ...state,
                city: action.nowWeather.name,
                icon: "http://openweathermap.org/img/wn/" + action.nowWeather.weather[0].icon + "@4x.png",
                description: action.nowWeather.weather[0].description,
                temperatureC: Math.round(action.nowWeather.main.temp-273.15) + "°C",
                temperatureK: Math.round(action.nowWeather.main.temp*9/5-459.57) + "°F",
                main: action.nowWeather.weather[0].main,
                humidity: action.nowWeather.main.humidity,
                country: action.nowWeather.sys.country,
            }
            //description -> Vietnamese
            for (let i of vietsubWeather){
                if(i[0] === state.description){
                    state = {
                        ...state,
                        description: i[1]
                    }
                }
            }
            // city -> Vietnamese
            for (let i of vietsubCity){
                if(i[0] === state.city){
                    state = {
                        ...state,
                        city: i[1]
                    }
                }
            }
            const listTomorrow = action.tomorrow.list;
            const tomorrow = getTomorrow();
            let arrTomorrow = [];
            for (let i of listTomorrow){
                if((i.dt_txt === tomorrow + " 00:00:00") || (i.dt_txt === tomorrow + " 06:00:00") || (i.dt_txt === tomorrow + " 12:00:00") || (i.dt_txt === tomorrow + " 18:00:00")) {
                    let data = {
                        time: i.dt_txt.substr(11, 5),
                        temperatureC: Math.round(i.main.temp - 273.15) + "°C",
                        icon: "http://openweathermap.org/img/wn/" + i.weather[0].icon + "@2x.png"
                    }
                    
                    arrTomorrow.push(data);
                }
            }
            state = {
                ...state,
                tomorrow: arrTomorrow,
            }

            
            return {...state};
        }
            
        default: {
            return {...state};
        }
            
    }
    
};




export default weathers;