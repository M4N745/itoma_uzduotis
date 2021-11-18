import {Alert} from "react-bootstrap"
import style from "./../../assets/css/smallBox.module.css"

import Icon from "./../../assets/icons/expand.png"

export default function Box(props) {
    return (
        <Alert id="smallBox" className={`${style.alertBox} p-1`} variant='primary'>
            <header>
                <img
                    onClick={() => {
                        document.getElementById("smallBox").style = "display: none";
                        document.getElementById("modal").style = "display: block";
                    }}
                    className={`${style.icon}`}
                    src={Icon} alt="icon"
                />
            </header>
            <main className={`p-2`}>Turite {props.count} pranešimus.</main>
        </Alert>
    );
}