import ResultItem from './ResultItem';
import DetailStyle from '../styles/detail.module.scss';

const DetailRelated = ( props ) => {
    //console.log('Loaded component');
    //console.log(props);
    return (
        <div className={DetailStyle.related_block}>
            {
                
                props.properties.map((item, index) => (
                    <ResultItem item={item} key={index} section="related" />
                ))
                
            }
        </div>
    );
}

export default DetailRelated;