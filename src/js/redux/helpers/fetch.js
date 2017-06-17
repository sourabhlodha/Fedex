

export const post = async ({ url, body, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    dispatch({ type: success, data });
  } catch (e) {
    dispatch({ type: failure });
  }
};

export const get = async ({ url, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    dispatch({ type: success, data });
  } catch (e) {
    dispatch({ type: failure });
  }
};

export const synthesize = async ({ token, text, success, dispatch }) => {
  try {
    const res = await fetch('https://speech.platform.bing.com/synthesize', {
      method: 'POST',
      body: `<speak version="1.0" xml:lang="en-US"><voice xml:lang="en-US" xml:gender="Female" name="Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)">${text}</voice></speak>`,
      headers: {
        'content-type' : 'application/ssml+xml',
        'X-Microsoft-OutputFormat' : 'riff-16khz-16bit-mono-pcm',
        'Authorization': 'Bearer ' + token,
        'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
        'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
        'User-Agent': 'TTSNodeJS',
      },
      encoding: null,
    });
    const data = await res.blob();
    dispatch({ type: success, data });
  } catch (e) {
    console.log(e);
  }
};