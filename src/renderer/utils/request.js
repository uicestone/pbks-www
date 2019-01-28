import config from "../config";

const parseJson = async res => {
  try {
    let data = await res.json();
    if (res.headers.get('x-wp-totalpages')) {
      data._totalPages = Number(res.headers.get('x-wp-totalpages'));
    }
    data._ok = res.ok;
    return data;
  } catch (e) {
    throw new Error("服务器错误");
  }
};

export const obj2query = obj => {
  let queryString = "";
  for (let [key, value] of Object.entries(obj)) {
    queryString += `&${key}=${encodeURIComponent(value)}`;
  }
  return queryString.substr(1);
};

export const request = async (url, options = {}) => {
  
  let { cacheable = true } = options;
  
  if (options.method && options.method !== 'GET') {
    cacheable = false;
  }

  url = `${config.apiRoot}${url}`;
  const cacheData = JSON.parse(localStorage.getItem(url));
  let remoteData = null;

  if (cacheable && cacheData) {
    // console.log("Cache data founded.");
    _fetch(url, options)
      .then(data => {
        localStorage.setItem(url, JSON.stringify(data));
        // console.log("Cache data.");
      })
      .catch(e => {
        console.error("Network error fetching data.");
      });

    return cacheData;
  } else {

    cacheable && console.log("Not found cached data, get data from remote server.", url);

    remoteData = await _fetch(url, options);
    localStorage.setItem(url, JSON.stringify(remoteData));
    // console.log("Cache data.");

    return remoteData;
  }
};

export const _fetch = (url, options) => fetch(url, options).then(parseJson);

export const getPosts = (datas) => {
  const { query, options } = datas;
  return request(`posts/?${obj2query(query)}`, options);
};

export const getAttachments = datas => {
  const { query, options = {} } = datas;
  return request(`attachments/?${obj2query(query)}`, options);
};

export const getWeather = datas => {
  return request(`weather`, {
    cacheable: false
  });
};

export const getSignedInMemberCount = datas => {
  return request(`signed-in-member-count`, {
    cacheable: false
  });
};

export const getRooms = floor => {
  return request(`rooms?floor=${floor}`);
};

export const getRoom = number => {
  return request(`rooms/${number}`, {cacheable: false});
};

export const getEvents = () => {
  return request(`events`);
};

export const submitAppointment = form => {
  const formData = new FormData();
  Object.keys(form).forEach(key => {
    formData.append(key, form[key]);
  });
  return request(`appointments`, {
    method: "POST",
    body: formData
  });
};

export const getAllResources = datas => {
  const query = {
    limit: -1
  }
  return request(`attachments?${obj2query(query)}`, {
    method: "GET"
  })
}