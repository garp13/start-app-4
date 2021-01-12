


const WeatherCard = (props) => {

    const {humidity, description, time, dayOfWeek, today} = props;
    return(
        <div className="weatherCard">   
            <p className="time"> {time} </p>

            <p className="day"> {dayOfWeek} - {today} </p>

            <p className="humidity"> Độ ẩm: {humidity} </p>
                    
            <p className="description"> Thời tiết: {description} </p>
            
      
            
        </div>
    )
}

export default WeatherCard;