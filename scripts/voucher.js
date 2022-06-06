let person=JSON.parse(localStorage.getItem("user"));
document.querySelector("#wallet_balance").innerText=person.amount;
async function getVouchers(){
    try{
        let res = await fetch ("http://masai-vouchers-api.herokuapp.com/api/vouchers");
        let data=await res.json();
        console.log(data[0].vouchers);
        appendVouchers(data[0].vouchers)
    }
    catch(e){
        console.log("e :",e);
    }
}
getVouchers();

function appendVouchers(data){
    voucher_list.innerHTML=null;
    data.forEach((e) => {
        let container = document.createElement("div");
        let name=document.createElement("p");
        name.innerText=e.name;
        let image=document.createElement("img");
        image.src=e.image;
        let price=document.createElement("p");
        price.innerText=e.price;

        let voucherButton=document.createElement("button");
       voucherButton.setAttribute("class","buy_voucher");
        voucherButton.innerText="Buy Voucher";
        voucherButton.onclick=function(){
            buyVoucher(e);
        }
       container.append(name,image,price,voucherButton);
       voucher_list.append(container);

    });
}
function  buyVoucher(e){
    person.amount=Number(person.amount)-e.price;
    if(person.amount>0){
    purchase=JSON.parse(localStorage.getItem("purchase")) || [];
    purchase.push(e);
   localStorage.setItem("purchase",JSON.stringify(purchase));
   let obj={
       name:person.name,
       email:person.email,
       address:person.address,
       amount:person.amount,
    
   }
  localStorage.setItem("user",JSON.stringify(obj));
 alert("Hurray! purchase successful");
}
else{
    alert("Sorry! insufficient balance");
}

}