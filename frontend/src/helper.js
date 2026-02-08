export const toggleClass = (elSelector, className) => {
    let el = document.querySelector(elSelector);
    el.classList.toggle(className);
    
};

export const removeClass = (elSelector, className) => {
    let el=document.querySelector(elSelector);
    el.classList.remove(className);
    
};

<<<<<<< HEAD

export const api_based_url = "https://code-editor-n12w.onrender.com"
=======
export const api_based_url = "https://code-editor-n12w.onrender.com";
>>>>>>> 4f7445a (ui fixed)
