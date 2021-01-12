import { Col } from "antd";



const Tomorrow = (props) => {

    const { time, icon, temp } = props;
    return(
        
            <Col span={6}>
                <div className="timeTomorrow">
                    {time}
                </div>

                <div className="iconTomorrow">
                    <img src={icon} alt="icon tomorrow" />
                </div>

                <div className="tempTomorrow">
                    {temp}
                </div>
            </Col>
        
    )
}

export default Tomorrow;