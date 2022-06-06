let form=document.querySelector("#form");
document.querySelector("#form").addEventListener("submit",addDetails);
var userData=JSON.parse(localStorage.getItem("user")) || {};
function addDetails(e){
    e.preventDefault();
    let userObj={
        name:form.name.value,
        email:form.email.value,
        address:form.address.value,
        amount:form.amount.value,
    };
   
    localStorage.setItem("user",JSON.stringify(userObj));

}

