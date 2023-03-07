import DetailStyle from '../styles/detail.module.scss';

const DetailBoxValue = (props) => {
    if(props.value !== '' && props.value !== 'null') {
        return (
            <div className={DetailStyle.box_line}>
                <div className={DetailStyle.box_label}>{props.label}:</div>
                <div className={DetailStyle.box_value}>{props.value}</div>
            </div>
        );
    }
}

export default DetailBoxValue;