console.log("hello world");

let multiLink = document.querySelector('.allLink');
function createLinks(){
    // read data from local storage;
    multiLink.innerHTML = ""
    let response  =   localStorage.getItem('data');
    let data = JSON.parse(response) || [];
    // loop over the data array and construct link UI for each data object
    data.forEach((item)=>{
        let template = `<div class="allLink">
        <div class="container" id="link1">
     <span>
         <h2>${item.originalURL}</h2>
     </span>
     <span>
         <h2>${item.shortURL}</h2>
         <button type="button" class="btn btn-lg btn-primary">copy</button>
     </span>
        </div>
        </div>`
        multiLink.innerHTML += template;
    }) 


    }

    createLinks()
    // insert the interface into the html using DOM

let linkForm = document.getElementById('link-form');

linkForm.addEventListener('submit', async (e)=>{
    // prevent form from submitting
    e.preventDefault()

    // construct the data for the form submission
    let link = {
        linkShorten: document.getElementById('linkShorten').value
    }
    // submit form with fetch api
    let response = await fetch('/short',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(link)
    });

    let data = await response.json();
    console.log(data);

    // data.forEach((link)=>{ 
    //     let template = ` <div class="linkGet">
    //     <h2>${originalURL}</h2>
    //     <h2>${shortURL}</h2>
    //   </div>`
    //   link.innerHTML += template;

    // })

    // localstorage API
    // localstorage.setItem - store something in localstorage
    // localstorage.getItem- retreive data from localstorage

    let links = JSON.parse(localStorage.getItem('data')) || []
    links.push(data);
    localStorage.setItem('data',JSON.stringify(links));
    createLinks()
})

multiLink.addEventListener('click', async (e)=>{
    if(e.target.classList.contains('copy')){
        console.log(e.target)
        await navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
    }
})
