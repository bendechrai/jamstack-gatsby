import React, { useEffect, useState } from 'react'

const Comments = ({slug}) => {
    const [comments, setComments] = useState([]);

    slug = slug.replace(/^\/|\/$/g, '')

    const loadComments = async (slug) => {
        const comments = await fetch(process.env.GATSBY_API + "/comments/" + slug)
            .then(res => res.json())
        setComments(comments)
    }

    useEffect(() => {
        loadComments(slug)
    }, [slug])

    return (
        <>
            <div className="comments">
                {comments.map(comment => (
                    <div className="comment" key={comment.id} style={{ marginBottom: `1.75rem` }}>
                        <blockquote style={{ marginBottom: `0` }}>
                            {comment.comment}
                            <p style={{ textAlign: `right` }}>&mdash; {comment.author}</p>
                        </blockquote>
                        <p style={{ textAlign: `right`, marginBottom: `0px`, marginRight: `1.75rem`, fontSize: `8px` }}>
                            <button style={{ border: `1px solid #f88`, borderRadius: `5px`, padding: `0.1rem 1rem`, backgroundColor: `#fdd` }} onClick={(event) => {
                                event.preventDefault()
                                fetch(process.env.GATSBY_API + "/comments/" + slug + "/" + comment.id, {
                                    method: 'DELETE',
                                }).then(res => {
                                    loadComments(slug)
                                })
                            }}>delete</button>
                        </p>
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
                }).then(res => {
                    loadComments(slug)
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