document.addEventListener('DOMContentLoaded', async (event) =>{
  const parameters = new URLSearchParams(window.location.search);
  const resID = parameters.get('resID');
  console.log(resID);

  function changePageTitle() {
    newPageTitle = 'The title has changed!';
    document.querySelector('title').textContent = newPageTitle;
  }

  const getMenu = async () => {
    const restromenu = await fetch(
      'https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=' +
        resID
    );
    // const restromenu=await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId/${resID}&catalog_qa=undefined&submitAction=ENTER`)
    const json = await restromenu.json();

    
    return json;
  };
  const json = await getMenu();
  // console.log(json);
  

  changePageTitle();
  const mainContainer = document.querySelector('.main-container');
  const head = document.createElement('div');

  const mainBody = document.createElement('div');

  head.classList.add('restro-head');
  mainBody.classList.add('main-body');

  mainContainer.appendChild(head);
  mainContainer.appendChild(mainBody);

  const headImg=document.createElement('img');
  const imgSrc=json.data.cards[2].card.card.info.cloudinaryImageId;
  headImg.src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+imgSrc;
  headImg.classList.add("head-img")

  const headData=document.createElement('div');
  head.append(headImg,headData);

  // headImg.src=json.data.cards[2].card.card.info.cloudinaryImageId;
  const headName=document.createElement('h2');
  const headCuisine=document.createElement('p');
  const headDetails=document.createElement('div');
  const ratings=document.createElement('p');
  const distance=document.createElement('p');
  const costForTwo=document.createElement('p');

  headCuisine.classList.add("head-cuisines");
  headData.classList.add("head-data")
  headName.classList.add("head-name");
  headName.innerText=json.data.cards[2].card.card.info.name;
  headCuisine.innerText=json.data.cards[2].card.card.info.cuisines.slice(0,5).join(",")

  headDetails.classList.add("head-details");
  ratings.innerText=json.data.cards[2].card.card.info.avgRating+" ratings";
  distance.innerText=json.data.cards[2].card.card.info.sla.deliveryTime+" min";
  costForTwo.innerText=json.data.cards[2].card.card.info.costForTwoMessage;
  headDetails.append(ratings,distance,costForTwo);
  headData.append(headName,headCuisine,headDetails);



const wholeData=json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards;
console.log(wholeData)
wholeData.forEach((singleData)=>{
  console.log(singleData)
  const item=document.createElement("div");
  const itemDetail=document.createElement("div");
  const itemRight=document.createElement("div")
  const itemImg=document.createElement("img");
  const addBtn=document.createElement("button");
  item.append(itemDetail,itemRight);
  itemRight.append(itemImg,addBtn);
  mainBody.appendChild(item);

  const itemName=document.createElement("h3");
  const itemDescription=document.createElement("p");
  itemDetail.append(itemName,itemDescription);

  itemImg.src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/"+singleData.card.info.imageId;

  itemName.innerText=singleData.card.info.name;
  itemDescription.innerText=singleData.card.info.description;

  item.classList.add("item");

  itemDetail.classList.add("item-details");
  itemName.classList.add("item-name")
  itemDescription.classList.add("item-desc");
  itemImg.classList.add("item-img")
  itemRight.classList.add("item-right")
  addBtn.innerText="Add+"
  addBtn.classList.add("add-btn")
})



// const singleData =
// json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
//   .itemCards[0].card.info;
// console.log(singleData);
//   const item=document.createElement("div");
//   const itemDetail=document.createElement("div");
//   const itemRight=document.createElement("div")
//   const itemImg=document.createElement("img");
//   const addBtn=document.createElement("button");
//   item.append(itemDetail,itemRight);
//   itemRight.append(itemImg,addBtn);
//   mainBody.appendChild(item);

//   const itemName=document.createElement("h3");
//   const itemDescription=document.createElement("p");
//   itemDetail.append(itemName,itemDescription);

//   itemImg.src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+singleData.imageId;

//   itemName.innerText=singleData.name;
//   itemDescription.innerText=singleData.description;

//   item.classList.add("item");

//   itemDetail.classList.add("item-details");
//   itemName.classList.add("item-name")
//   itemDescription.classList.add("item-desc");
//   itemImg.classList.add("item-img")
//   itemRight.classList.add("item-right")
//   addBtn.innerText="Add+"

   


});
