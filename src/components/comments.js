import React, { useEffect, useState } from 'react'

const Comments = ({slug}) => {
    const [comments, setComments] = useState([]);

    slug = slug.replace(/^\/|\/$/g, '')

    useEffect(() => {
        async function fetchComments(slug) {
            const comments = await fetch(process.env.GATSBY_API + "/comments/" + slug)
                .then(res => res.json())
            setComments(comments)
        }
        fetchComments(slug)
    }, [slug])

    return (
        <>
            <div className="comments">
                {comments.map(comment => (
                    <div className="comment" key={comment.id}>
                        <p style={{ textAlign: `right`, marginBottom: `0px`, fontSize: `8px` }}>
                            <a href="#" onClick={(event) => {
                                event.preventDefault()
                                fetch(process.env.GATSBY_API + "/comments/" + slug + "/" + comment.id, {
                                    method: 'DELETE',
                                })
                            }}>delete</a>
                        </p>
                        <blockquote>
                            {comment.comment}
                            <p style={{ textAlign: `right` }}>&mdash; {comment.author}</p>
                        </blockquote>
                    </div>
                ))}
            </div>
            <form onSubmit={event => {
                event.preventDefault()
                fetch(process.env.GATSBY_API + "/comments/" + slug, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({
                        author: event.target.author.value,
                        comment: event.target.comment.value,
                    }),
                })
            }}>
                <div>
                    <label htmlFor="author" style={{ display: `inline-block`, width: `100px`, verticalAlign: `top` }}>Name:</label>
                    <input type="text" name="author" id="author" style={{ display: `inline-block`, width: `500px`, }}/>
                </div>
                <div>
                    <label htmlFor="comment" style={{ display: `inline-block`, width: `100px`, verticalAlign: `top` }}>Comment:</label>
                    <textarea name="comment" id="comment" style={{ display: `inline-block`, width: `500px`, }}></textarea>
                </div>
                <div>
                    <button type="submit">Go</button>
                </div>
            </form>
        </>
    )
}

export default Comments