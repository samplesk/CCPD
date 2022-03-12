const fellowshipList = data;
const acc = document.getElementsByTagName('h1');
const input = document.getElementById("txt-search");

/**
 * search_fellowship() function
 * allows user to type in text to search
 * then checks through the titles of all
 * fellowships and keeps those who have
 * the input visible and hides those who
 * do not have the input.
 */
function search_fellowship(){
    // get everything to all uppercase for matching purposes
    const filter = input.value.toUpperCase();
    // loop through all the fellowships to check for matchins titles to input
    for(var i=0; i < fellowshipList.length; i++) {
        // if the uppercased input matches the uppercased name in the fellowships
        if(fellowshipList[i].name.toLocaleUpperCase().includes(filter)){
            // keep the fellowship in the accordion available
            acc[i].style.display = 'block';
        // otherwise if the input is not in the title
        } else {
            // hide the accordion section for that title
            acc[i].style.display = 'none';
        }
    }
}