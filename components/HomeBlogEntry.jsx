"use client"
import HomeStyle from "../styles/home.module.scss";

const HomeBlogEntry = ( props ) => {

    return (
        <div className={HomeStyle.blog_item}>
            <div className={HomeStyle.blog_image}>
                <img src={props.image} alt="" width="300" height="200" />
            </div>
            <h5>{props.title}</h5>
            <div className={HomeStyle.blog_excerpt}>{props.excerpt}</div>
        </div>
    );

}

export default HomeBlogEntry;