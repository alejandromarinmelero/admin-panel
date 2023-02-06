import React, { useState } from "react";
import "./style.scss";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import { NewContext } from "../../Context/Context";
import { Accordion } from "react-bootstrap";

const Home = () => {
  const [value, onChange] = useState(new Date());

  const { user, notesFound } = useContext(NewContext);

  return (
    <div className="home">
      <h1 className="home-header">Blog Status</h1>
      <section className="section-one">
        <div className="accordions">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Today</Accordion.Header>
              <Accordion.Body>
                <p>
                  <span>Date:</span> {value.toLocaleString().split(",")[0]}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Last Connection</Accordion.Header>
              <Accordion.Body>
                <p>{user.date}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Card className="card-notes">
            <Card.Body>
              <img
                src="https://img.icons8.com/ios-filled/50/FFFFFF/overview-pages-1.png"
                alt="notes-img"
              />
              <Card.Text>
                <span>{notesFound.length}</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>Blog posts saved</Card.Footer>
          </Card>
        </div>

        <div className="calendar">
          <Card className="card-calendar">
            <Card.Header>Calendar</Card.Header>
            <Card.Body>
              <Calendar
                className="calendar"
                onChange={onChange}
                value={value}
              />
            </Card.Body>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
