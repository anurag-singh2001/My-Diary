import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        // a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            This is About page and he is in batch B2
        </div>
    )
}

export default About