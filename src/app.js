import { get, deletePost, post, put } from './myfunc';


const titleEl = document.getElementById('title');
const bodyEl = document.getElementById('body');
const idEl = document.getElementById('id');
const btnEl = document.getElementById('btn');
const postEl = document.getElementById('posts');
const cardEl = document.getElementById('card');

btnEl.addEventListener('click',sendPost);
// get post from the server
document.addEventListener('DOMContentLoaded', getPost);
// delete a post 
document.addEventListener('click',deletefxn);
//// listen for edit state
document.addEventListener('click',editState);
function deletefxn(e) {
  e.preventDefault();
 if(e.target.id == 'delete'){
    // console.log();
    const id = e.target.dataset.id
    if(confirm('Are you sure?')) {
      deletePost(`http://localhost:3000/posts/${id}`).then((data)=>{
        console.log(data);
        sendAlert('danger'," you post has been delete");
        location.reload()
      }).catch(err => console.log(err));
      
    }
  }
}


function sendPost(e) {
  e.preventDefault();
  const t = titleEl.value;
  const b = bodyEl.value;
  const idPost = idEl.value;
  
  if(t == "" || b ==""){
    console.log(" the fills are empty ");
    sendAlert('danger', "fill in the inputs please");
    setTimeout(() => {
     location.reload();
    }, 1000);

  }else{
    // if id field is empty then we post new item
    //if id fiels has a value then we update the same item
    let data = {
      title:t, body:b, id:idPost
    }
    if (idPost === ""){
       console.log(" working here", data);

        post('http://localhost:3000/posts',data).then(()=>{
          sendAlert('success', "message sent succefully");
        });
    }else{
      console.log(data);
      put(`http://localhost:3000/posts/${idPost}`, data).then(()=>{
        sendAlert('primary', "updated successfully");
      })
      .catch((err)=> console.log(err))
    }
   
     
     location.reload();
  }
    
}

 async function getPost() {
   await get('http://localhost:3000/posts').then((oldPost)=>{
    let output = '';
    oldPost.forEach(i => {
      output +=`
   <div class="card card-body mb-1">
    <h4 class="card-title">${i.title}</h4>
    <p> ${i.body}</p>
    <div class= " d-flex flex-flow">
    <a href="#" id ="edit" class="btn btn-info btn-md mr-1" data-id="${i.id}">
        <i class="fa fa-pencil"></i>
        edit
     </a>

    <a href="#" id = "delete" class="btn btn-danger btn-md " data-id="${i.id}">
       <i class="fa fa-remove"></i>
       delete
    </a></div>
  </div>
   `;
    });
  postEl.innerHTML = output;
   })
   .catch((err)=>{
     console.log("network fail"+err);
   })
 }

/// alert notification
function sendAlert(a, msg) {
  cardEl.innerHTML = `<p class = "alert alert-${a}"> ${msg}</p>`;
}

///update or edit
function editState(e) {
  const y = e.target;
 
  if(e.target.id == "edit"){
  
    let id = e.target.dataset.id; 
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    //  let data = {
    //    title : title,
    //    body: body
    //  }
 
    titleEl.value = title;
    bodyEl.value = body;
    idEl.value = id
    btnState('edit');

  }
}
function btnState(type) {
  if (type === 'edit'){
    console.log(btnEl);
    btnEl.className = "btn btn-warning";
    btnEl.textContent = 'update post';
  }
}