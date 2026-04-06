import Search from "../Search/Search";
import SeccionPopulares from "../SeccionPopulares/SeccionPopulares";
import SeccionTopRated from "../SeccionTopRated/SeccionTopRated";

function Main(){
    return(
        <>
        <Search/>
        <h2 className="alert alert-primary">Popular movies this week</h2>
        <SeccionPopulares/>
        <h2 className="alert alert-primary">Movies now playing</h2>
        <SeccionTopRated/>
        </>
    )
}

export default Main