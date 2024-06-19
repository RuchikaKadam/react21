import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");

  async function getTranslatedData() {
    try {
      const encodeData = new URLSearchParams();
      encodeData.append("source_language", sourceLanguage);
      encodeData.append("target_language", targetLanguage);
      encodeData.append("text", data);

      const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '513bc9feecmsh53e013a3f7ea66ep1db005jsnd2085072aac0',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodeData,
      };
      const res = await axios.request(options);
      setResult(res.data.data.translatedText);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Hindi-English Translator</h1>
      <div className="container">
        <div style={{display:"flex"}}>
        <select
          name="source"
          onChange={(e) => {
            setSourceLanguage(e.target.value);
          }}
          value={sourceLanguage}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <br />
        <select
          name="target"
          onChange={(e) => {
            setTargetLanguage(e.target.value);
          }}
          value={targetLanguage}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        </div>
        {/* <br /> */}
        <input
          name="data"
          placeholder="type here..."
          onChange={(e) => setData(e.target.value)}
        />
        <br />
        <button onClick={getTranslatedData}>Translate</button>
        {/* <br /> */}
        <p className="result">{result}</p>
      </div>
    </div>
  );
}

export default App;