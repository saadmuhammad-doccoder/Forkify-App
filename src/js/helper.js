import { TIMED_OUT } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Request Timedout after ${s} second`)
      );
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMED_OUT)]);
    const fetchedData = await response.json();
    if (!response.ok)
      throw new Error(`${fetchedData.message} (${response.status})`);
    return fetchedData;
  } catch (err) {
    alert(err);
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//   } catch (err) {
//     alert(err);
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const response = await Promise.race([fetchPro, timeout(TIMED_OUT)]);
//     const fetchedData = await response.json();
//     if (!response.ok) throw new Error(`${data.message} (${response.status})`);
//     return fetchedData;
//   } catch (err) {
//     alert(err);
//   }
// };
