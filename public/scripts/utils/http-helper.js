class HttpHelper {
  static async ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({
      "content-type": "application/json",
      ...(headers || {}),
    });

    return fetch(url, {
      method: method.toUpperCase(),
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((x) => x.json());
  }
}

export default HttpHelper;
