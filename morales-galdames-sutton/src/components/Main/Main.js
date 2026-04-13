import SeccionPopulares from "../SeccionPopulares/SeccionPopulares";
import SeccionTopRated from "../SeccionTopRated/SeccionTopRated";
import "./styles.css"

function Main(){
    return(
        <>
        <h2 className="alert alert-primary">Popular movies this week</h2>
        <SeccionPopulares/>
        <h2 className="alert alert-primary">Movies top rated</h2>
        <SeccionTopRated/>
        </>
    )
}

export default Main