const axios = require("axios");

const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

  const response = await axios.get(url);

  const data = response.data;

  if (!data || data.length === 0) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };

  return coordinates;
}

exports.getCoordsForAddress = getCoordsForAddress;
