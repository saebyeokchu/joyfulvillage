const postFetcher = ([url, postData]: [string, FormData]) =>
    fetch(url, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: postData,
      credentials: 'include',
    }).then((res) => res.json());

const postJsonFetcher = ([url, postData]: [string, any]) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
    credentials: 'include',
  }).then((res) => res.json());

const getFetcher = (url: string) => fetch(url).then((res) => res.json());

export {
    postFetcher,
    getFetcher,
    postJsonFetcher
}