import style from "./rate.module.scss";
function RateInput(props) {
    // alert()
    return (
        <>
            <div className={style.border}>
                <div className={style.content} style={{ width: `${props.num}%` }}></div>
            </div>
        </>
    );
}

export default RateInput;