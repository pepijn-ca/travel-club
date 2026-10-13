


// Some help functions to select elements
function qs(target){
    return document.querySelector(target)
}
function qsall(target){
    return document.querySelectorAll(target)
}

function showError(elm, err, text){
    elm.classList.add("error-border")
    err.style.display = "block";
    err.textContent = text;
}
function hideError(elm, err){
    elm.classList.remove('error-border');
    err.style.display = null;
    err.textContent = '';
}

// Input style for focus function
function setupInputStyle(){
    qsall("input").forEach(elm=>{
        elm.addEventListener("focus", ()=>{
            elm.style.backgroundColor = '#fffae0';
        })
        elm.addEventListener("blur", ()=>{
            elm.style.backgroundColor = 'white';
        })
    })
}

// Input Validation, return true is input is valid
function checkUsername(){
    const elm = qs("#username");
    const err = qs("#error-username");

    if (elm.value.trim().length == 0){
        showError(elm,err,'Username is required');
        return false;
    } else {
        hideError(elm,err)
        return true;
    }
}
function checkEmail(){
    const elm = qs("#email");
    const err = qs("#error-email");

    // Source - https://stackoverflow.com/a/46181
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!elm.value.toLowerCase().match(re)){
        showError(elm,err,'Enter a valid email address');
        return false;
    } else {
        hideError(elm,err)
        return true;
    }
}
function checkPassword(){
    const elm = qs("#password");
    const err = qs("#error-password");

    if (elm.value.length < 8){
        showError(elm,err,'Password must be at least 8 characters');
        return false;
    } else {
        hideError(elm,err);
        return true;
    }
}
function checkTos(){
    const elm = qs("#terms");
    const err = qs("#error-terms");

    if (!elm.checked){
        showError(elm,err,'You must accept the terms');
        return false;
    } else {
        hideError(elm,err);
        return true;
    }
}
function formValidation(){
    const form = qs("#signup-form");

    form.addEventListener("submit", (e)=>{

        if (
            !checkUsername()|
            !checkEmail()|
            !checkPassword()|
            !checkTos()
        ){
            e.preventDefault();
        } else {
            // Content is valid
            e.preventDefault();
            alert("Submitting....")
        }
    })
}

// Card Clicker
function onCardClick(elm){
    // Clear other ones
    qsall(".thumb.expanded").forEach(e=>e.classList.remove('expanded'))

    elm.classList.add("expanded")
    const name = elm.dataset.city
    const cap = qs("#image-caption")
    cap.textContent = `This shot is from ${name}`
}

// Main event setup function
function main(){
    setupInputStyle();
    formValidation();

    qsall(".thumb").forEach(e=>{
        e.addEventListener('click', ()=>onCardClick(e))
        e.addEventListener('keydown', (ev)=>{
            if (ev.key == "Enter"){
                onCardClick(e)
            }
        })
    })

}
document.addEventListener("DOMContentLoaded", main)
