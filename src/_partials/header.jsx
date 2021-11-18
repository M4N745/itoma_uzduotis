import style from "./../assets/css/header.module.css"

export default function Header(){
    return (
        <header className={`${style.header} d-flex`}>
            <span className={`my-auto mx-auto h2`}>header</span>
        </header>
    );
}