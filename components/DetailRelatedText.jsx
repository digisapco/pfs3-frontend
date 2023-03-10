import ResultItemText from './ResultItemText';
import DetailStyle from '../styles/detail.module.scss';

const DetailRelatedText = ( props ) => {
    //console.log('Loaded component');
    //console.log(props);
    return (
        <div className={DetailStyle.related_block}>
            {
                props.properties.map((item, index) => (
                    <ResultItemText item={item} key={index} />
                ))
            }
        </div>
    );
}

export default DetailRelatedText;