var $AddToCart = document.querySelector('#AddToCart')
var _btnOffset = $AddToCart.offsetTop
window.onscroll = function () {
    if(window.pageYOffset >= (_btnOffset + 44)) {
        $AddToCart.style.cssText = "position: fixed; bottom:0; left:0;color:#ffffff;background-color:#d77e6a"
    } else if (window.pageYOffset < _btnOffset ) {
        $AddToCart.style.cssText = "position: inherit; background-color:none"
    }
}


// 
var _productCount = document.querySelector('#ProductThumbs').childElementCount
var _cellWidth = Math.floor(document.body.clientWidth / 3)
document.querySelector('#ProductThumbs').style.width = _cellWidth * 7 + 'px'