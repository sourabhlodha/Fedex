// import axios from 'axios';
// var request = require('request');
//   xmlbuilder = require('xmlbuilder'),
//   wav = require('wav'),
// const Speaker = require('speaker');
// const wav = require('wav');



// const speaker = async (data) => {
//   try {
//     var reader = new wav.Reader();
//     reader.on('format', function (format) {
//       reader.pipe(new Speaker(format));
//     });
//     var Readable = require('stream').Readable;
//     var s = new Readable;
//     s.push(data);
//     s.push(null);
//     s.pipe(reader);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// export const Synthesize = async => () => {
//   console.log('test');
//   const apiKey = 'c05ff93bc9c24b6f87978167c57da85b';
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });
//     const data = await res.json();
//     dispatch({ type: success, data });
//   } catch (e) {
//     dispatch({ type: failure });
//   }
//   post({
//     url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
//     headers: {
//       'Ocp-Apim-Subscription-Key' : apiKey,
//     },
//   }, (err, resp, access_token) => {
//     console.log(err, resp, access_token);
//   });
// };

