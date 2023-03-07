"use client"
import { useState } from 'react';
import HomeBlogEntry from './HomeBlogEntry';
import HomeStyle from "../styles/home.module.scss";

const HomeBlog = () => {

    const entries = [
        {
            "id":1,
            "title": "Test",
            "description":"An apple mobile which is nothing like apple",
            "image":"https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        },
        {
            "id":2,
            "title": "Test",
            "description":"An apple mobile which is nothing like apple",
            "image":"https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        },
        {
            "id":3,
            "title": "Test",
            "description":"An apple mobile which is nothing like apple",
            "image":"https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        },
        {
            "id":4,
            "title": "Test",
            "description":"An apple mobile which is nothing like apple",
            "image":"https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        }
    ];

    return(
        <>
        <div className={HomeStyle.blog_container}>
            {
                entries.map(({title, description, image, id}) => (
                    <HomeBlogEntry key={id} title={title} excerpt={description} image={image} />
                ))
            }
        </div>
        </>
    )
}

export default HomeBlog;