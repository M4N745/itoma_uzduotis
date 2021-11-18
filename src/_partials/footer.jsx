import style from "./../assets/css/footer.module.css"

export default function Footer(){
    return (
        <footer className={`${style.footer} d-flex`}>
            <span className={`my-auto mx-auto h3`}>footer</span>
        </footer>
    );
}