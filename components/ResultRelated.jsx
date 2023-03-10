import ResultItemText from './ResultItemText';
import SearchStyle from '../styles/search.module.scss';

const ResultRelated = (props) => {
    return (
        <div className={SearchStyle.related_block}>
            <h3>Otras personas también buscaron</h3>
            <div>
                {
                    props.properties.map((item, index) => (
                        <ResultItemText item={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default ResultRelated;