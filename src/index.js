console.log('%c HI', 'color: firebrick')

//IMPORTANT ELEMENTS
const breedFilter = document.querySelector(`#breed-dropdown`)


//on page load - fetch images using url: "https://dog.ceo/api/breeds/image/random/4"
fetch("https://dog.ceo/api/breeds/image/random/4")
.then(response => response.json())
.then(data => {
    const dogImages = data["message"]
    //console.log(dogImages)
    for(const image of dogImages){
        const img = document.createElement('img')
        img.src = `${image}`
        document.querySelector('#dog-image-container').appendChild(img)
    }
})

//fetch all dog breeds using url: 'https://dog.ceo/api/breeds/list/all'
fetch('https://dog.ceo/api/breeds/list/all')
.then(response => response.json())
.then(data => {
    const dogBreeds = data['message']
    //console.log(dogBreeds)

    for(const breed in dogBreeds){
        //console.log(dogBreeds[breed])
        const subBreeds = dogBreeds[breed]
        if(subBreeds.length > 0){
            for(const subBreed in subBreeds){
                //console.log(subBreeds[subBreed])
                const li = document.createElement('li')
                li.innerText = `${breed} ${subBreeds[subBreed]}`
                li.addEventListener('click', handleItemColorChange)
                document.querySelector(`ul#dog-breeds`).appendChild(li)
            }
        }
        else{
            const li = document.createElement('li')
            li.innerText = `${breed}`
            li.addEventListener('click', handleItemColorChange)
            document.querySelector(`ul#dog-breeds`).appendChild(li)
        }
    }
})

breedFilter.addEventListener('change', handleBreedFilter)
//console.log(document.querySelector(`ul`))


//FUNCTIONS
const handleItemColorChange = e => {
    e.target.style.color = 'green'
}

function handleBreedFilter(e){
    const filter = e.target.value
    const listItems = document.querySelectorAll(`#dog-breeds li`)
    if(filter === "No Filter"){
        listItems.forEach(listItem => listItem.style.display = "list-item")
    }
    else{
        listItems.forEach(listItem =>{
            if(listItem.innerText[0] != filter){
                listItem.style.display = "none"
            }
            if(listItem.innerText[0] === filter){
                listItem.style.display = "list-item"
            }
        })
    }
}