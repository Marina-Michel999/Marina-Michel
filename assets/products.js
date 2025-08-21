document.addEventListener("DOMContentLoaded" , function () {
    //-----------------------------------------html elements-----------------------------------------
    const productCard = document.querySelectorAll('.product-card');
    const popupContainer = document.querySelector('.popup-container');
    const removePopupIcon = document.querySelectorAll('.remove-popup-icon');
    const popups = document.querySelectorAll('.popup-container');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const selectArrows = document.querySelectorAll('.select-arrow');
    const selects = document.querySelectorAll('select');

    //------------------------------------------- variables-------------------------------------

    let selectIsOpened = false 
    //using it to know if select is open or not
    // so if it open we will rotate the arrow


    //---------------------------------------------functions--------------------------------

    //-[1]--------for showing popup-------
    function showPopup() {
        popupContainer.classList.add('open-popup')
    }


    //-[2]----------Add to cart function------------
    
    // * steps
    //[1]- fetch one product by useing handle
    //we will get handle on click on add to cart button

    //[2]-by using product we will get array of variants
    //[3]-getting choosen size and color value on clich
    //[4]-looping on variants array and check if the chhosen size = option and choosen color = option2
    //[5]-if true we will store varint id in a variable
    //[6]-using variant id to add to cart 

    async function addToCart (handle , size , color) {
        // fetch one product by useing handle
        async function getProduct() {
            const result = await fetch(`products/${handle}`)
            const product = await result.json();
            return product
        }
        const product = await getProduct()
        // get array of variants
        const variants = product.variants;
        //get variant id and title
        let variantTitle =' ';
        let variantId =' ';
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].option1 === size && variants[i].option2 === color) {
                variantTitle = variants[i].title;
                variantId = variants[i].id;
            }     
        }
        console.log(variantTitle);
        console.log(variantId);
        //function for adding variant to cart by using its id
        async function AddVariantToCart(variantId , VariantQuantity = 1) {
            await fetch('/cart/add.js',{
                method : 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: variantId,
                    quantity: VariantQuantity
                })
            })
        }
        AddVariantToCart(variantId)
    } 


    //------------------------------------------------events---------------------------------------------------------
    
    //-[1]-event to open popup when click on card

    productCard.forEach(card =>{
        card.addEventListener("click" , function () {
        const popup = card.nextElementSibling;
        popup.classList.remove('d-none')
        popup.classList.add('open-popup')
        showPopup()

    });
    });
    
    //-[2]-event for hide popup when click on remove icon

    removePopupIcon.forEach(icon => {
        icon.addEventListener("click" , function () {
            popups.forEach(popup => {
                console.log(popup)
                popup.classList.add('d-none');
                popup.classList.remove('open-popup');
                console.log(popup);
            });
        });
    });

    //-[3]-event for getting choosen handle , size and color values and then use them in add to cart function
    //to add variant to cart on click

    addToCartBtns.forEach(btn=>{
        btn.addEventListener("click" , function () {
            const handleInput= btn.nextElementSibling;
            const handle = handleInput.value
            const variantForm = btn.closest('.variant-form');
            console.log(variantForm)
            const colorInput = variantForm.querySelector('input[name="color"]:checked');
            const color = colorInput.value
            console.log(color)
            const sizeInput = variantForm.querySelector('#sizeDropdown');
            console.log(sizeInput);
            const size = sizeInput.value
            console.log(size)
            addToCart (handle , size , color)

        })
    })

    //-[4]-event for toggling arrow rotation when select close and open
    selects.forEach(select =>{
        select.addEventListener('click' , function() {
            selectIsOpened = !selectIsOpened
                if (selectIsOpened) {
                    console.log('add rotae')
                    selectArrows.forEach(arrow =>{
                    arrow.classList.add('rotate')
                    })
                }else{
                console.log('remove rotae')
                selectArrows.forEach(arrow =>{
                arrow.classList.remove('rotate')
                })
                }     
        });
    });
});


