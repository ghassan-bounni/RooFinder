import React, { useRef } from "react";

const Step1 = ({ handleChange, handleSubmit, values }) => {
  const { scale, image } = values;
  const img = useRef();

  return (
    <div>
      <div className="intro">
        <h2>Step 1</h2>
        <p>
          Upload an aerial image along with its scale (in meter per pixel) to
          analyze.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
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
              value={scale}
              onChange={handleChange("scale")}
              required
            />
          </div>
          <div>
            <input
              ref={img}
              type="file"
              accept="image/*"
              id="image"
              name="image"
              className="inputfile"
              onChange={handleChange("image")}
              required
            />
            <label htmlFor="image" style={{ fontSize: "1.3em" }}>
              {img.current?.value
                ? img.current.value.split("\\").pop()
                : "Upload an image..."}
            </label>
          </div>
          {img.current?.files[0] && (
            <div style={{ width: "155px" }}>
              <img
                src={URL.createObjectURL(img.current.files[0])}
                alt={image.name}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="button">
          Analyze
        </button>
      </form>
    </div>
  );
};

export default Step1;
