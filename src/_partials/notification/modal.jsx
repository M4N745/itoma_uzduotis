import React from "react"

import {Row, Col, Dropdown, Alert, Form} from "react-bootstrap"
import style from "./../../assets/css/modal.module.css"

import Close from "./../../assets/icons/close.png"
import Filter from "./../../assets/icons/filter.png"
import Didz from "./../../assets/icons/d-to-m.png"
import Maz from "./../../assets/icons/m-to-d.png"
import Read from "./../../assets/icons/view.png"

import Pagination from "react-js-pagination";


import TestData from "./../../data/data.json"

export default class Modal extends React.Component{ 
    constructor(props){
        super(props);

        sessionStorage.setItem('page', 1);
        let page = parseInt(sessionStorage.getItem("page"));
        let check = parseInt(sessionStorage.getItem('markAsRead'));
        if(check === 0){check = false;}
        else{check = true;}

        this.state = {
            markAsRead: check,

            activeFilter: "",
            orderBy: "",
            info: TestData,

            isSorted: false,
            activeSort: "",
            sortedItems: [],

            dataToShow: TestData,
            activePage: page
        }
    }


    componentDidMount(){
        let multiply;
        if(this.state.info.length < 3){ multiply = this.state.info.length;}
        else {multiply = 3;}
        
        let max, start, arr = [];
        if (this.state.activePage !== 1){
            max = this.state.activePage * multiply;
            start = max - multiply;
        }
        else {
            max = multiply;
            start = max - multiply;
        }
        for(let i = start; i < max; i++){
            if(this.state.isSorted === true){
                arr.push(this.state.sortedItems[i]);
            }else{
                arr.push(this.state.info[i]);
            }
        }
        this.setState({dataToShow: arr});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.activePage !== prevState.activePage){
            this.setState({activePage: this.state.activePage}, () => {
                let max, start, arr = [];
                if (this.state.activePage !== 1){
                    max = this.state.activePage * 3;
                    start = max - 3;
                }
                else {
                    max = 3;
                    start = max - 3;
                }
    
                for(let i = start; i < max; i++){
                    if(this.state.isSorted === true){
                        arr.push(this.state.sortedItems[i]);
                    }else{
                        arr.push(this.state.info[i]);
                    }
                }
                this.setState({dataToShow: arr});
            });
        }
    }


    filterHandler(val) {
        let s = val.target.value;
        this.setState({activeFilter: s}, () => {
            let arr = [];
            for (let i = 0; i < this.state.info.length; i++){
                if(this.state.info[i].type === this.state.activeFilter){
                    if(this.state.isSorted === true){
                        arr.push(this.state.sortedItems[i]);
                    }else{
                        arr.push(this.state.info[i]);
                    }
                }
            }
            this.setState((state, props) => ({dataToShow: arr}));
        });
    }

    handlePageChange(pageNumber) {
        sessionStorage.setItem('page', pageNumber);
  
        this.setState({activePage: pageNumber});
    }

    orderAsc() {
        if(this.state.activeSort !== "asc"){
            this.setState({activeSort: "asc", isSorted: true}, () => {
                let arr = this.state.info;
                let sArr = [];

                arr.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });

                for (let i = 0; i < 3; i++){
                    sArr.push(arr[i]);
                }
                this.setState({dataToShow: sArr, sortedItems: arr});
            })
        }

    }
    orderDesc() {
        if(this.state.activeSort !== "desc"){
            this.setState({activeSort: "desc", isSorted: true}, () => {
                let arr = this.state.info;
                let sArr = [];

                arr.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });
                arr.reverse();

                for (let i =0; i < 3; i++){
                    sArr.push(arr[i]);
                }

                this.setState({dataToShow: sArr, sortedItems: arr});
            })
        }

    }

    markAsRead(){
        this.setState({markAsRead: true}, () => {
            this.setState({
                activeFilter: "",
                orderBy: "",
    
                isSorted: false,
                activeSort: "",
            });
        });
    }

    close(){
        if(!this.state.markAsRead){
            document.getElementById("modal").style = "display: none;";
            document.getElementById("smallBox").style = "display: block;";
        }
        else{
            this.props.close();
        }
    }
    clearFilter(){
        this.setState({activeFilter: ""}, () => {
            let arr = [];
            for(let i = 0; i < 3; i++){
                arr.push(TestData[i]);
            }
            this.setState({dataToShow: arr})
        });
    }
    render(){
        let maxItems = this.state.info.length;
        if(this.state.activeFilter !== ""){maxItems = this.state.dataToShow.length;}

        return (
            <div id="modal" className={`${style.modal}`}>
                <div className={`${style.modal_body}`}>
                    <header>
                        <Row className={`w-100`}>
                            <Col className={`mr-3 d-flex`}>
                                <Dropdown className="my-auto" autoClose="outside">
                                    <Dropdown.Toggle variant="light">
                                        <img className={`${style.icon}`} src={Filter} alt="icon"/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.ItemText>Filtruoti pagal pranesimo tipa</Dropdown.ItemText>
                                        <Dropdown.Divider/>
                                        <div className={`${style.checkbox_div}`}>
                                            <Form.Check
                                                value="danger"
                                                type="radio"
                                                name="filter"
                                                label="Danger"
                                                onChange={this.filterHandler.bind(this)}
                                            />
                                            <Form.Check
                                                value="warning"
                                                type="radio"
                                                name="filter"
                                                label="Warning"
                                                onChange={this.filterHandler.bind(this)}
                                            />
                                            <Form.Check
                                                value="info"
                                                type="radio"
                                                name="filter"
                                                label="Info"
                                                onChange={this.filterHandler.bind(this)}
                                            />
                                            <Form.Check
                                                value="success"
                                                type="radio"
                                                name="filter"
                                                label="Success"
                                                onChange={this.filterHandler.bind(this)}
                                            />
                                            <Dropdown.Divider/>
                                            <span
                                                onClick={this.clearFilter.bind(this)}
                                                className={`${style.icon}`}
                                            >Isvalyti filtra</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col className={`ml-3 mr-3 text-center d-flex`}>
                                <img
                                    onClick={this.orderAsc.bind(this)}
                                    style={{width: '40%'}}
                                    className={`my-auto mx-auto ${style.icon}`}
                                    src={Didz}
                                    alt="icon"
                                />
                            </Col>
                            <Col className={`ml-3 mr-3 text-center d-flex`}>
                                <img
                                    onClick={this.orderDesc.bind(this)}
                                    style={{width: '40%'}}
                                    className={`my-auto mx-auto ${style.icon}`}
                                    src={Maz}
                                    alt="icon"
                                />
                            </Col>
                            <Col className={`ml-3 mr-3 text-center d-flex`}>
                                <img
                                    onClick={this.markAsRead.bind(this)}
                                    className={`my-auto mx-auto ${style.icon}`}
                                    src={Read}
                                    style={{width: '70%'}}
                                    alt="icon"
                                />
                            </Col>
                            <Col className={`ml-3 d-flex`}>
                                <img 
                                    style={{width: '40%', height: '50%'}}
                                    onClick={this.close.bind(this)}
                                    className={`mx-auto my-auto ${style.icon}`}
                                    src={Close} alt="icon"
                                />
                            </Col>
                        </Row>
                    </header>
                        {this.state.markAsRead
                        ?
                        <>
                            <main className='d-flex'>
                                <Alert className={`my-auto mx-auto text-center`} variant="info">
                                    Pranešimų nėra.
                                </Alert>
                            </main>
                            <footer>
                                <Pagination
                                    className="w-25 mx-auto"
                                    size="sm"
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={3}
                                    totalItemsCount={1}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </footer>
                        </>
                        :
                        <>
                            <main>
                                {
                                    this.state.dataToShow.map((val, key) => {
                                        let url;
                                        if (val.urlName !== "" && val.url !== "") {
                                            url = <a rel="noreferrer" target="_blank" href={val.url}>{val.urlName}</a>;
                                        }
                                        return (
                                            <Alert className={'w-100'} variant={val.type} key={key}>
                                                <header className={`text-center h4 pb-3 border-bottom border-`+val.type}>{val.title}</header>
                                                <main>{val.description}</main>
                                                <footer className={`text-center pt-3 border-top border-`+val.type}>
                                                    <Row>
                                                        <Col className={`pr-3`}>
                                                            <span>Status: </span>
                                                            <span className="text-uppercase">{val.type}</span></Col>
                                                        <Col>{url}</Col>
                                                    </Row>
                                                </footer>
                                            </Alert>
                                        );
                                    })
                                }
                            </main>
                            <footer>
                                <Pagination
                                    className="w-25 mx-auto"
                                    size="sm"
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={3}
                                    totalItemsCount={maxItems}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </footer>
                        </>
                        }
                </div>
            </div>
        );
    }
}