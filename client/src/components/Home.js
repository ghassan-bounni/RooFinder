import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [result, setresult] = useState("");
  const [formValue, setIformValue] = useState({
    scale: 0,
    image: null,
  });
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(key, value);
    });

    Axios.get("/api/segment").then((res) => {
      setresult(res.data);
    });
  };

  useEffect(() => {
    if (formValue.image) {
      setImageUrl(URL.createObjectURL(formValue.image));
      console.log(URL.createObjectURL(formValue.image));
    }
  }, [formValue.image]);

  return (
    <div className="home">
      <div className="intro">
        <h1>Header Goes Here</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam
          voluptas quibusdam distinctio ad tenetur iure incidunt praesentium,
          animi facilis quas dicta odit molestiae ea vero rerum assumenda
          adipisci quaerat, exercitationem ut unde! Ipsam at dolores eligendi ea
          velit ipsa quibusdam, praesentium vitae! Esse optio distinctio
          inventore tempora commodi eum.
        </p>
        <p>result: {result}</p>
      </div>

      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className="inputs">
          <div>
            <label htmlFor="scale">
              Scale <small>(m/px)</small>:
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              id="scale"
              name="scale"
              onChange={(e) => {
                setIformValue({
                  ...formValue,
                  scale: e.target.value,
                });
              }}
              required
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              className="inputfile"
              onChange={(e) => {
                setIformValue({
                  ...formValue,
                  image: e.target.files[0],
                });
              }}
              required
            />
            <label htmlFor="image">
              {formValue.image
                ? formValue.image.name.split("\\").pop()
                : "Choose an image..."}
            </label>
          </div>
          {imageUrl && formValue.image && (
            <div style={{ width: "155px" }}>
              <img
                src={imageUrl}
                alt={formValue.image.name}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
