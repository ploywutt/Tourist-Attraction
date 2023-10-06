import { useEffect, useState } from "react";
import axios from "axios";
import "../css/search.css";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [delay, setDelay] = useState(null);

  async function getData() {
    try {
      let result = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      console.log("keyword", search);
      console.log(result.data.data);
      console.log(result.data.data.tags);
      setData(result.data.data);
    } catch (error) {
      console.log(`${bye}`, error);
    }
  }

  useEffect(() => {
    if (delay) {
      clearTimeout(delay);
    }
    setDelay(setTimeout(() => getData(), 1000));
  }, [search]);

  return (
    <section className="a search-bar">
      <div className="container">
        <h1>Lost in Time and Space</h1>
        <div className="input flex container">
          <h3>"...ไปเที่ยวกันไหม จะไปก็รีบไป ไปกับพี่แล้วสบาย..."</h3>
          <input
            type="text"
            placeholder="แล้วทำไมเรายังไม่วาร์ป. . ."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {data.map((item, index) => {
          return (
            <div className="a flex data" key={index}>
              <div className="image-box">
                <img className="title-img" src={item.photos[0]} />
              </div>
              <div className="travel container">
                <a href={item.url}>
                  <h2 className="title hover">{item.title}</h2>
                </a>
                <p>{item.description.slice(0, 100)}...</p>
                <a className="hover" href={item.url}>
                  อ่านต่อ
                </a>
                <div className="add tag">
                  <p>หมวดหมู่:</p>
                  {item.tags.map((tag, index) => {
                    return (
                      <h4
                        className="hover"
                        key={index}
                        onClick={() => {
                          setSearch(tag);
                        }}
                      >
                        {tag}
                      </h4>
                    );
                  })}
                </div>
                <div className="add tag">
                  {item.photos.slice(1).map((photo, index) => {
                    return <img className="sm-photo" key={index} src={photo} />;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SearchBar;
