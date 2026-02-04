import { Link } from "react-router-dom";
const Notfound= ()=>{
    return(
    <div className="text-center">
        <div>
            <h1 className="text-danger display-5"> 404</h1>
        </div>
        <div>    
            <h3 className="">Oops!Page not found</h3>
            <p className="text-dark">The page you're looking for doesn't exist or has been moved.</p>
            <button className="btn btn-primary">
                <Link to ="/" className="text-light">Go to Homepage</Link>
            </button>
        </div>
    </div>
    )

}
export default Notfound;