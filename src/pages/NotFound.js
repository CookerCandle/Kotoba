import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div className='not-found'>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist. <Link to="/">Go back to home</Link></p>
        </div>
    )
}

export default NotFound;