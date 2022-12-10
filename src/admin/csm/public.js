import React from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import parse from 'html-react-parser'
import './public.css'

//Import Countdown
import Countdown from "react-countdown"

//Import Images
import logo from "../../assets/images/logo-dark.png"
import maintanence from "../../assets/images/coming-soon.svg"
import { useState, useEffect } from "react"

import axios from 'axios'
import { alerShow, dateformat } from '../commonFunction'
const yourHtmlString = '<h1>Hello</h1>'

const PagesComingsoon = () => {
    
    const { id } = useParams()

    const [description, setDescription] = useState(null);
    const [title, setTitle] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        fetchData(id);
    }, [])

    const fetchData = async (type) => {
        await axios.get(`${BASE_URL}csm/page/detail?type=` + type)
            .then(function (response) {
                console.log(response.data)
                setDescription(response.data.data.description);
                setTitle(response.data.data.title);
            })
            .catch(function (error) {
                alerShow('Error', error.response.data.message, 'error');
            });
    }


    //meta title
    document.title = "About Us | GB";

    return (
        <React.Fragment>
            <div className="">
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="">
                                {
                                    description && 
                                    <div>
                                        <h3 className="mt-5 mb-3">{title}</h3>
                                        {parse(description)}
                                    </div>
                                }

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default PagesComingsoon
