import React from "react";
import Nav from "./components/Nav/Nav";
import UploadBar from "./components/UploadBar/UploadBar";
import Preview from "./components/Preview/Preview";
import IconStash from "./components/IconStash/IconStash";
import data from "../../shared/data.js";

export default function App() {
  let [uploadedSVGData, setUploadedSVGData] = React.useState();
  let [uploadedPNGData, setUploadedPNGData] = React.useState();
  let [filteredData, setFilteredData] = React.useState([]);
  let [searching, setSearching] = React.useState(false);
  let [firstLoad, setFirstLoad] = React.useState(true);

  function getIconsFromFilteredIDs(sortedRes) {
    let res = sortedRes.map((image) => {
      for (let icon of data) {
        if (icon.id === image.id) {
          return { ...image, ...icon };
        }
      }
    });
    return res;
  }

  React.useEffect(() => {

    async function getFilteredIcons() {
      if (uploadedSVGData) {
        setSearching(true);
        setFilteredData([]);
        setUploadedPNGData();
        const response = await fetch(
          `https://vercel-backend-ws6h.vercel.app/getFilteredIconsFromSVG`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: uploadedSVGData }),
          }
        );

        if (response.ok) {
          const disp = await response.json();
          console.log(disp.time);
          setFilteredData(getIconsFromFilteredIDs(disp.sortedRes));
          setSearching(false)
        } else {
          const err = await response.json();
          alert(err.message);
        }
        setFirstLoad(false);
      }
    }
    getFilteredIcons();
  }, [uploadedSVGData]);

  React.useEffect(() => {
    async function convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    async function getFilteredIcons() {
      if(uploadedPNGData) {
        setSearching(true);
        setFilteredData([]);
        setUploadedSVGData();
        const base64File = await convertToBase64(uploadedPNGData);
        const userInput = encodeURIComponent(base64File)
        const response = await fetch(
          // `https://vercel-backend-ws6h.vercel.app/getFilteredIconsFromPNG`,
          `http://localhost:3001/getFilteredIconsFromPNG`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: base64File }),
          }
        );

        if (response.ok) {
          const disp = await response.json();
          console.log(disp.time);
          setFilteredData(getIconsFromFilteredIDs(disp.sortedRes));
          setSearching(false);
        } else {
          const err = await response.json();
          alert(err.message);
        }
        setFirstLoad(false);
      }
    }
    getFilteredIcons();
  }, [uploadedPNGData])

  return (
    <div className="App">
      <Nav />
      <UploadBar setUploadedSVGData={setUploadedSVGData} setUploadedPNGData={setUploadedPNGData} searching={searching}/>
      <Preview uploadedSVGData={uploadedSVGData} uploadedPNGData={uploadedPNGData}/>
      <IconStash iconData={filteredData} searching={searching} firstLoad={firstLoad}/>
    </div>
  );
}
