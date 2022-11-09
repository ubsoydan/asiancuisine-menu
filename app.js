const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img: "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: `Spicy rice cakes, serving with fish cake.`,
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img: "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img: "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: `Boiling vegetables, serving with special hot sauce`,
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img: "https://thewoksoflife.com/wp-content/uploads/2014/11/dan-dan-noodles-15-1.jpg",
    desc: `Dan dan noodle, serving with green onion `,
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img: "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: `Yangzhou style fried rice, serving with bean and pickles `,
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img: "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
    desc: `Rice Sandwich, serving with soy sauce`,
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img: "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: `Black bean sauce noodle, serving with green onion `,
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: "China",
    price: 12.99,
    img: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
  },
  {
    id: 9,
    title: "Doroyaki",
    category: "Japan",
    price: 3.99,
    img: "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
    desc: `Red bean paste dessert, serving with honey.`,
  },
];

//THE DOM VARIABLES
const menuContainerDom = document.querySelector("#menu-container");
const btnContainer = document.querySelector(".btn-container");

//CREATE FILTER CATEGORY BUTTONS

function categoryButtons(menuData) {
  //CREATE AN ARRAY FOR KEEPING CATEGORIES W/ AN ELEMENT "ALL"

  let allCategories = new Array("All");

  //LOOP THRU "MENU" AND INSERT CATEGORY VALUES WHICH allCategories DOESN'T HAVE

  menuData.forEach((item) => {
    if (!allCategories.includes(item.category)) {
      allCategories.push(item.category);
    }
  });

  //THEN CREATE A BUTTON FOR EACH CATEGORY WE JUST HAVE SCRAPED

  allCategories.forEach((item) => {
    let button = document.createElement("button");
    button.classList.add("btn", "btn-item", "btn-outline-secondary");
    button.setAttribute("id", `${item}`); //WE'LL USE THIS LATER FOR SELECTING SPECIFIC BUTTONS
    button.textContent = item;
    button.addEventListener("click", clickButton); //THIS FUNCTION'LL HELP WITH FILTERING
    btnContainer.append(button); //INSERT THE BUTTON INTO BUTTON CONTAINER
  });
}

//THIS IS FOR EVENT LISTENER - WILL DO FILTERING STUFF

function clickButton() {
  const theButton = this.getAttribute("id"); //JUST A SHORTCUT FOR SELECTING THE BUTTON WE'RE ON (THIS KEYWORD)
  const filtered =
    theButton == "All" //IF "ALL" BUTTON, JUST RETURN "MENU"
      ? menu
      : //IF NOT, FILTER "MENU" USING THE ID DATA WHICH WE OBTAINED FROM THE BUTTON WE'RE ON
        menu.filter(function (item) {
          return item.category == theButton;
        });

  //NOW RENDER WHOLE MENU AGAIN WITH PROVIDED DATA (A NEW ARRAY THANKS TO .filter())
  renderMenuItems(filtered);
}

//RENDER MENU -------

function renderMenuItems(menuData) {
  menuContainerDom.innerHTML = ""; //CLEAR THE CONTAINER FIRST EVERY TIME FUNCTION GETS CALLED

  let renderMenu = menuData.map((itemobj) => {
    //GET EACH MENU ITEM SEPERATELY
    let menuItem = document.createElement("div"); //CREATE A MENU ITEM CARD TEMPLATE
    menuItem.classList.add("menu-items", "col-sm-12", "col-lg-6");
    menuItem.innerHTML = `
    <img src=${itemobj.img} alt=${itemobj.title} class="photo" />
    <div class="menu-info">
      <div class="menu-title">
        <h3>${itemobj.title}</h3>
        <h3 class="price">${itemobj.price}</h3>
      </div>
      <div class="menu-text">
        ${itemobj.desc}
      </div>  
    </div>
    `;
    menuContainerDom.append(menuItem); //INSERT THE TEMPLATE WITH EACH MENU ITEM IN IT
  });
  return renderMenu;
}

//LOAD DEFAULT WHEN PAGE IS LOADED
renderMenuItems(menu);
categoryButtons(menu);
