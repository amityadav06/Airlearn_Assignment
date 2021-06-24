import { useEffect, useState } from "react";
import "./styles.css";

// const getStorageTheme = () => {
//   let arr = [];
//   if (localStorage.getItem("arr")) {
//     arr = localStorage.getItem("arr");
//   }
//   return arr;
// };

export default function App() {
  const [image, setImage] = useState("");
  // const [arr, setArr] = useState(getStorageTheme());
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("image", files[0]);
    setLoading(true);
    const res = await fetch("https://api.imgur.com/3/image/", {
      method: "POST",
      headers: {
        Authorization: "Client-ID 5370b168efb757a"
      },
      body: data
    });
    const file = await res.json();
    setImage(file.data.link);
    setArr([...arr].concat(image));
    setLoading(false);
  };

  // useEffect(() => {
  //   localStorage.setItem("arr", arr);
  // }, [arr]);

  return (
    <div className="App">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        arr.map((item) => {
          return (
            <div>
              <img src={item} style={{ width: "300px" }} />;
            </div>
          );
        })
      )}
    </div>
  );
}
