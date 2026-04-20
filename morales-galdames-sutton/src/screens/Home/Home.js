import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Search from "../../components/Search/Search";
import "./Home.css";

function Home() {
  return (
    <>
    <Header/>
      <div className="search-container">
        <Search/>
      </div>
      <Main/>
      <Footer/>
    </>
  );
}

export default Home;