//Sets the src of an element. 
function setSrc (el, src){
    el.src = src;
}

//Sets the innerHTML of a newly created element and appends it to a parent node
//Uses innerHTML instead of innerText to work with starRating
function createNappend(typeOfEl, parent, text = ""){
    const newEl = document.createElement(typeOfEl);
    newEl.innerHTML = text;
    parent.appendChild (newEl);
}

//Sets the innerText of an element.
function setText (el, text){
    el.innerText = text;
}

//Returns a string that contains 5 stars, # of filled based on parameter (Rounds up).
function starRating (numOfStars){
    let maxStars = 5;
    let rating = "";
    for (let i=0; i<maxStars; i++){
        if(i<numOfStars){
            rating+= "&#9733 ";
        }else{
            rating+= "&#9734 ";
        }
    }
    return rating;
}

//Returns a string that contains the an <a> tag  with text and a specific Id for details page.
function detailsLink (text, id){
    return `<a href='details.html?id=${id}'>${text}</a>`;
}

// const test = document.querySelector("header");
// createNappend("span", test, starRating(4));

export {setSrc, starRating, setText, createNappend, detailsLink};