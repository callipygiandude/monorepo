import sharp from "sharp";
import data from "../../data.js";
import pixelmatch from "pixelmatch";

const OPTIMISED_SIZE = 28;
const THRESHOLD = 0.1;
const FILTER_LIMIT = 0.25;
const SLICE_LIMIT = 10;

export default async function handler(req, res) {
  const { userInput } = req.query;
  try {
    let t1 = Date.now();
    const PNGBuffer = getBufferFromPNG(userInput);
    let sortedRes = await filterIcons(PNGBuffer);
    let t2 = Date.now();
    res.status(200).json({ sortedRes: sortedRes, time: t2 - t1 });
  } catch (error) {
    console.error(`Error with API call: `, error);
    res
      .status(500)
      .json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
  }
}

function getBufferFromPNG(file) {
    const base64Data = file.replace(/^data:image\/png;base64,/, "");
    return Buffer.from(base64Data, "base64");
}

async function convertSVGToData(svgPath) {
  try {
    const { data } = await sharp(svgPath)
      .resize(OPTIMISED_SIZE, OPTIMISED_SIZE)
      .raw()
      .toBuffer({ resolveWithObject: true });

    return data;
  } catch (error) {
    console.error(`Error converting ${svgPath} to raw object:`, error);
  }
}

async function filterIcons(userInput) {
  const baseSVGData = await convertSVGToData(userInput);

  const promises = data.map(async (image) => {
    const imageSVGPath = image.nodepath;
    const imageSVGData = await convertSVGToData(imageSVGPath);

    const totalPixels = OPTIMISED_SIZE * OPTIMISED_SIZE;
    const differentPixels = pixelmatch(
      baseSVGData,
      imageSVGData,
      null,
      OPTIMISED_SIZE,
      OPTIMISED_SIZE,
      {
        threshold: THRESHOLD,
        includeAA: false,
      }
    );
    const mismatchRatio = differentPixels / totalPixels;
    return {
      id: image.id,
      mismatch: mismatchRatio,
      exactMatch: mismatchRatio === 0,
    };
  });

  const res = await Promise.all(promises);
  const sortedRes = res
    .filter((image) => image.mismatch < FILTER_LIMIT)
    .sort((a, b) => a.mismatch - b.mismatch)
    .slice(0, SLICE_LIMIT);
  return sortedRes;
}
