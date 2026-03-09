const userName = document.getElementById("userName");
const password = document.getElementById("password");
const defaultUser = document.getElementById("defaultUser");
const defaultPassword = document.getElementById("defaultPassword");

// function showError(id){
// if(id === 'userName'){
//     defaultUser.innerText = "Wrong user name Please enter 'admin'";
//    defaultUser.classList.add('text-red-500','animate-bounce')
// }else{
//     defaultUser.classList.remove('text-red-500','animate-bounce','text-purple-500') 
//     defaultUser.classList.add('text-green-500') 
//     defaultUser.innerHTML =`<i class="fa-regular fa-circle-check"></i> Correct Your user name `;
    
// }
// if(id === 'password'){

// }
// }

document.getElementById("signInBtn").addEventListener("click", () => {
    defaultUser.innerText =''
  const userNameValue = userName.value.toLowerCase();
  const passwordValue = password.value;
  if(userNameValue.trim() ===''){
    defaultUser.innerHTML = `<i class="fa-regular fa-circle-xmark "></i>Please enter <span class="text-green-500">admin</span> your user name`;
    defaultUser.classList.add('text-red-500','animate-bounce') 
    return;
  }else if (userNameValue != "admin") {
   defaultUser.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Wrong user name Please enter <span class="text-green-500">admin</span>`;
   defaultUser.classList.add('text-red-500','animate-bounce') 
    return;
  }
  else{
      defaultUser.classList.remove('text-red-500','animate-bounce','text-purple-500') 
      defaultUser.classList.add('text-green-500') 
      defaultUser.innerHTML =`<i class="fa-regular fa-circle-check"></i> Correct Your user name `;
      
  }
  if(passwordValue.trim()===''){
    defaultPassword.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> Please enter <span class="text-green-500">admin123</span>  your password`;
    defaultPassword.classList.add('text-red-500','animate-bounce') 
    return;
  }else if (passwordValue != "admin123") {
   defaultPassword.innerHTML = ` <p class="text-center"><i class="fa-regular fa-circle-xmark"></i> Wrong Your Password Please enter <span class="text-green-500 ">admin123</span></p> `;
   defaultPassword.classList.add('text-red-500','animate-bounce') 
    return;
  } else{
      defaultPassword.classList.remove('text-red-500','animate-bounce','text-purple-500') 
      defaultPassword.classList.add('text-green-500') 
      defaultPassword.innerHTML =`<i class="fa-regular fa-circle-check"></i> Correct Your Password `;
      window.location.href='./home.html'
  }

  console.log(userNameValue, passwordValue);
});
