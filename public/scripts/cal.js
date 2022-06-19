// function priceTotal() {
//   var qty = parseInt(document.getElementById("qty").value);
//   var price = parseFloat(document.getElementById("price").value);
//   if (total == 0) {
//     total = price;
//   } else {
//     var total = price * qty;
//     document.getElementById("total").value = total;
//   }
// }

var priceCal = () => {
  let totalPrice = document.getElementById("total_price");
  let resPro = document.getElementById("prgm");
  let initialPrice = 0;
  let options = Array.from(resPro.children);
  let guestQty = document.getElementById("gQty");

  options.forEach((option) => {
    if (resPro.value == option.value) {
      initialPrice = option.dataset.pro_price;
    }
  });

  let guestNum = guestQty.value;
  if (guestNum == "") {
    guestNum = 0;
  }
  totalPrice.value = parseInt(guestNum) * parseFloat(initialPrice);
};
