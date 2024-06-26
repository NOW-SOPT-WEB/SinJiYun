
// navBar 버튼
const sideBtn = document.querySelector(".sidebarBtn");
const closeBtn = document.querySelector(".closeBtn");
const sideBar = document.querySelector(".sideBar");

// localStorage 불러오기
let cartItems = JSON.parse(localStorage.getItem('cartitems'));
const tableClass = document.querySelector(".table");

// 구매하기 버튼
const buyBtn = document.querySelector(".buyBtn");

// 모달
const buyModal = document.querySelector(".buyModal");
const buyModalClose = document.querySelector(".modalClose");
const buyItem = document.querySelector(".modalItem");
const allPay = document.querySelector(".allPay");

const modalBuyButton = document.querySelector(".buy");

// 사이드바 
const openSideBar = () => {
    sideBar.classList.remove("sideBarClose"); 
    sideBar.classList.add("sideBarOpen");
}

const closeSideBar = () => {
    sideBar.classList.remove("sideBarOpen");
    sideBar.classList.add("sideBarClose");
}

sideBtn.addEventListener("click", openSideBar);
closeBtn.addEventListener("click", closeSideBar);

//  장바구니 table
let cartItemCard = cartItems.map(item => {
    return `
    <tr>
    <td><input type="checkBox" class="checkBox" id="check${item.title}"></td>
    <td><img src="${item.image}" style="width: 4rem;"></td>
    <td>${item.title}</td>
    <td>${item.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
    <td>${item.category}</td>
    <td><button class="delete">삭제</button></td>
    </tr>
    `
});

tableClass.innerHTML += cartItemCard.join('');

// 삭제 버튼
const deleteBtns = document.querySelectorAll('.delete');

// 삭제


deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener('click', () => {
        cartItems.splice(index, 1); 
        localStorage.setItem('cartitems', JSON.stringify(cartItems));
        // 아이템 삭제 화면에 반영
        location.href='./cart.html';
    });
});

// 전체 체크박스
const allCheckbox = document.querySelector(".allCheckbox");

let checkedItem = []

function selectAll(selectAll)  {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkBox) => {
        checkBox.checked = allCheckbox.checked
    })
}

    allCheckbox.addEventListener("click", () => {
    selectAll(this);
    checkedItem = cartItems;
});

// 일부 체크 확인
const checkBox = document.querySelectorAll(".checkBox");

checkBox.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkedItem.push(cartItems[index]);
        } else {
            const removedIndex = checkedItem.indexOf(cartItems[index]);
            if (removedIndex !== -1) {
                checkedItem.splice(removedIndex, 1);
            }
        }
    });
});

// 구매
buyBtn.addEventListener("click", () => {
    buyModal.classList.remove("buyModalClose");  
    buyModal.classList.add("buyModalOpen");

    let buyItems = checkedItem.map(item => {
        pay += Number(item.price);
        return `
        <article class="buyItem">
            <img src="${item.image}" alt="${item.title}">
            <h4>${item.title}</h4>
            <p>${Number(item.price).toLocaleString('ko-KR')}원</p>
        </article>
        `;
    });
    
    buyItem.innerHTML += buyItems.join('');
    allPay.innerHTML = `총 금액 : ${Number(item.price).toLocaleString('ko-KR')}원`;
    
});

// modal 닫기
buyModalClose.addEventListener("click", () => {
    buyModal.classList.remove("buyModalOpen");   
    buyModal.classList.add("buyModalClose");
});

let pay = 0

// 모달에서 구매 버튼
modalBuyButton.addEventListener("click", () => {
    
    // alert
    const confirmed = confirm(`주문완료`);

    // 주문 완료 시 모달 닫기
    buyModal.classList.remove("buyModalOpen");   
    buyModal.classList.add("buyModalClose");

            let deleteCheckItem = checkedItem.map(checkItem =>{
                cartItems = cartItems.filter(function(item) {
                    return item !== checkedItem;
                });
                
            
            });
            localStorage.setItem('cartitems', JSON.stringify(cartItems));

});
