import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actGetWeather } from '../actions';
import { API_KEY } from '../constants/Key';
import axios from 'axios';
import Home from '../components/Home';

Weather.propTypes = {
    weathers: PropTypes.object.isRequired,
    onCity: PropTypes.func.isRequired,
};

Weather.defaultProps = {
    
}
function Weather(props) {
    const { onCity,weathers } = props;
    const [city, setCity] = useState("Ho Chi Minh");
    
    const changeCity = (city) => {
        setCity(city);
    }
    useEffect(() => {
        const getWeather = async (city) => {
            let nowWeather = '';
            try {
                nowWeather = await axios({
                    url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
                    method: 'GET'
                });
                const tomorrow = await axios({
                    url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
                    method: 'GET'
                });
                
                onCity(nowWeather.data,tomorrow.data);
            } catch (error) {
                alert(error);
            }
            
        }
        getWeather(city);
    }, [city]);


   
    return (
       <div>
                <Home 
                    weathers = { weathers }
                    changeCity = { changeCity }
                />
       </div>
             
           
           
           
            
           
        
    );
}



const mapDispatchToProps = (dispatch, props) => {
    return{
        onCity: (nowWeather,tomorrow) => {
            dispatch(actGetWeather(nowWeather,tomorrow));
        },
    }
}


const mapStateToProps = state => {
    return{
        weathers: state.weathers,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Weather);