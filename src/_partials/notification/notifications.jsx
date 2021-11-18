import React from "react"

import style from "./../../assets/css/notification.module.css"
import data from "./../../data/data.json"

import Box from "./smallBox"
import Modal from "./modal"

export default class Notification extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            render: true,
            data: [],
        };
    }

    componentDidMount(){
        sessionStorage.setItem('markAsRead', 0);
        this.setState({data: data});
    }

    handleChildUnmount(){
        this.setState({render: false});
    }
    render(){
        return (
            <div className={`${style.overlay}`}>
                {this.state.render
                ?
                <>
                    <Box count={this.state.data.length}/>
                    <Modal close={this.handleChildUnmount.bind(this)}/>
                </>
                : null
                }
            </div>
        );
    }
}