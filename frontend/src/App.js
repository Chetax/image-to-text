import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const SurpriseOption = [
    'Is the image not visible?',
    'Is the image dark?'
  ];

  const surprise = () => {
    setValue(SurpriseOption[Math.floor(Math.random() * SurpriseOption.length)]);
  };

  const clear = () => {
    setImage(null);
    setValue("");
    setError("");
    setResponse("");
  };

  const analyzeImage = async () => {
    if (!image) {
      setError("Error! Must have an image");
      return;
    }
    try {
      // Your analysis code here
      setResponse("Image analyzed successfully!"); // Example response
    } catch (err) {
      console.log(err);
      setError("Something did not work");
    }
  };

  const uploadImage = async (e) => {
    console.log(e.target.files);
    const formItem = new FormData();
    formItem.append('file', e.target.files[0]);
    setImage(e.target.files[0]);
    e.target.value = null;
    try {
      const response = await axios.post('/upload', formItem);
      const data = response.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <section className='search-section'>
        <div className='image-container'>
          {image && <img src={URL.createObjectURL(image)} style={{ width: "25vw" }} alt="Uploaded" />}
        </div>
        <p className='extra-info'>
          <span>
            <label htmlFor='files'>Upload an Image</label>
            <input onChange={uploadImage} id="files" type='file' accept='image/*' hidden />
          </span>
          to ask a question about.
        </p>
        <p>What do you want to know about the image?
          <button className='surprise' onClick={surprise}>Surprise me</button>
        </p>
        <div className='input-container'>
          <input
            value={value}
            placeholder='What is in the image?'
            onChange={e => setValue(e.target.value)}
          />
          {(!response && !error) && <button onClick={analyzeImage}>Ask me</button>}
          {(response || error) && <button onClick={clear}>Clear</button>}
        </div>
      </section>
    </div>
  );
}

export default App;
