const axios = require("axios");
require("dotenv").config();

const checkToken = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios.get(
      "https://api.spotify.com/v1/artists/2nvl0N9GwyX69RRBMEZ4OD?si=oup4SipaSb-Fkku4nPQlxw",
      { headers }
    );

    return true;
  } catch (error) {
    return false;
  }
};

const getToken = async () => {
  const config = {
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const { data } = await axios.post(
    `https://accounts.spotify.com/api/token`,
    config,
    { headers }
  );

  return data.access_token;
};

const getTrackData = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
    headers,
  });

  return data;
};

module.exports = { getToken, checkToken, getTrackData };
