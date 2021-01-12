
import { Col, Row } from 'antd';
import './App.scss';

import Weather from './containers/Weather';

function App() {
  return (
    <div className="App">
      <Row>

        <Col span={16} offset={4}>
          <Weather />
       </Col>
      </Row> 
     
    </div>
  );
}

export default App;
