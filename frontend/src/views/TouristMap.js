import React, {useEffect, useState} from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Map from 'react-map-gl';
import axios from "axios"
function TouristMap() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <div style={{ height: '100vh', width: '100%' }}>
                    <Map
                      initialViewState={{
                        longitude: 10.1815,
                        latitude: 36.8065,
                        zoom: 10
                      }}
                      style={{ width: "90vw", height: "90vh" }}
                      mapStyle="mapbox://styles/mapbox/streets-v9"
                      mapboxAccessToken='pk.eyJ1IjoiYm9jaHJhLW16IiwiYSI6ImNsYTgzZ285OTIxeWczcW8zbThrdXptMjQifQ.DZAIWKl3ovOcWwqoB4GpmQ'
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TouristMap;
