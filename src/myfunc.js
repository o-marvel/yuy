
  ///make a  delete request 
export async function deletePost(url) {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  });
  const resData = await 'Resource Deleted...';
  return resData;
}

  // Make a POST Request
 export async function 
  post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    console.log(resData);
    return resData;
   
  }

 /// make a get request 
 export async function get(url){
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  return data; 
}

///make a update request
 export async function put(url, data) {
  const res = await fetch( url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const resData = await response.json();
    return resData;


}

