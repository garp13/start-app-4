// import { Button } from "antd";

import { Col, Row } from "antd";



const TagCity = (props) => {
    const {onChangeCityName} = props;
    return(
        <div className="tagCity">
            <Row>
                <Col span={6}>
                    <button onClick={() => onChangeCityName("Ho Chi Minh")}>Hồ Chí Minh</button>

                </Col>

                <Col span={6}>
                    <button onClick={() => onChangeCityName("Da Nang")}>Đà Nẵng</button>

                </Col>

                <Col span={6}>
                    <button onClick={() => onChangeCityName("Ha Noi")}>Hà Nội</button>

                </Col>

                <Col span={6}>
                    <button onClick={() => onChangeCityName("Hue")}>Huế</button>

                </Col>
            </Row>
        </div>
    )

}

export default TagCity;