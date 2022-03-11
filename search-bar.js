const fellowshipList = data;
const acc = document.getElementsByTagName('h1');
const searchInput = document.querySelector("[data-search]");

function search_fellowship(){
    const filter = searchInput.value.toUpperCase();
    for(var i=0; i < fellowshipList.length; i++) {
        if(fellowshipList[i].name.toLocaleUpperCase().includes(filter)){
            acc[i].style.display = 'block';
        } else {
            acc[i].style.display = 'none'
        }
    }
}