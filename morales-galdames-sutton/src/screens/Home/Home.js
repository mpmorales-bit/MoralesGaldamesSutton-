import Main from "../../components/Main/Main";
import Search from "../Search/Search";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="search-container">
        <Search/>
      </div>
      <Main />
    </>
  );
}

export default Home;