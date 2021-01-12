import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import "../assets/styles/Home.scss";
import IconWeather from "./IconWeather";
import TagCity from "./TagCity";
import Tomorrow from "./Tomorrow";
import WeatherCard from "./WeatherCard";

const Home = (props) => {
    const { changeCity, weathers } = props;
    const [city, setCity] = useState({
                                            cityName:"",
                                            temperature: true,
                                            time:"",
                                            today: "",
                                            dayOfWeek: "",
                                            });
    useEffect(() => {
        getTimeNow();
    }, []);
    
    const getTimeNow = () => {
        let now = new Date();
        let today = String(now.getDate()).padStart(2, '0') + "/" + String((now.getMonth() + 1)).padStart(2, '0') + "/" + now.getFullYear();
        let time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');
        let dayOfWeek = now.getDay();
        let days = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

        setCity({
            ...city,
            time: time,
            today: today,
            dayOfWeek: days[dayOfWeek],
        })
    }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     getTimeNow();
    //     changeCity(city.cityName);
    // }

    const onChangeCityName = (name) => {
        setCity({
                        ...city,
                        cityName: name,
                    });
        getTimeNow();
        console.log(name);
        changeCity(name);
    }

    const renderWeatherTomorrow = () => {
        return weathers.tomorrow.map ( (item, index) =>{
            return <Tomorrow 
                        time={item.time}
                        icon={item.icon}
                        temp={item.temperatureC}
                        key={index}
                    />
        })
    };

    return(
        <div>
            <TagCity 
                onChangeCityName={onChangeCityName}
            />
            <div className="homePage">
                <div className="cardPage">
                    <div className="cityName">
                        {weathers.city}
                    </div>
                </div>
                <Row>
                    <Col span={10}>
                        <WeatherCard 
                            humidity = {weathers.humidity}
                            description = {weathers.description}
                            time = {city.time}
                            dayOfWeek = {city.dayOfWeek}
                            today = {city.today}
                        />                    
                    </Col>

                    <Col span={10}>
                        <IconWeather 
                            iconWeather = {weathers.icon}
                        />
                    </Col>

                    <Col span={4}>
                        <div className="temperature">
                            <h3>{city.temperature ? weathers.temperatureC : weathers.temperatureK}</h3>
                            <p>
                                
                                <span
                                    onClick={() => {
                                        setCity({
                                            ...city,
                                            temperature: true
                                        })
                                    }}
                                    className={city.temperature ? "temperature-active" : "temperature-not-active" }
                                >°C</span>/<span
                                                onClick={() => {
                                                    setCity({
                                                        ...city,
                                                        temperature: false
                                                    })
                                                }}
                                                className={!city.temperature ? "temperature-active" : "temperature-not-active" }
                                            >°F</span>
                            </p>
                        </div>
                    </Col>
                </Row>
                
            

                <div className="tomorrowWeather">
                    <h3>THỜI TIẾT NGÀY MAI</h3>
                    <Row>
                        
                        {renderWeatherTomorrow()}
                    </Row>
                </div>
            
           
            
            {/* <form>
                <input type="text" id="cityName" name="cityName" value={city.cityName} onChange={onChangeCityName} />
                <input type="submit" value="Submit" onClick={handleSubmit}/>
            </form> */}
            </div>
        </div>
    )
}

export default Home;