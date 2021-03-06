var fellowshipList = fellowships_json_data;
var acc = document.getElementsByTagName('h1');
var input = document.getElementById("txt-search");
/**
 * search_fellowship() function
 * allows user to type in text to search
 * then checks through the titles of all
 * fellowships and keeps those who have
 * the input visible and hides those who
 * do not have the input.
 */
function search_fellowship(){
    set_accordion_inactive() // located in filter.js, cleans up accordion to make displaying search results easier
    // get everything to all uppercase for matching purposes
    const filter = input.value.toUpperCase();
    // loop through all the fellowships to check for matching titles to input
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
/*
* Checks to see if the X at the end of the search bar was clicked
* if it was then we set all of the accordion items to display
* since the X being clicked would mean the search bar would be empty
*/
if(input){
    document.getElementById("txt-search").addEventListener("search", function(event) {
        for(var i=0; i< fellowshipList.length; i++){ // loop through all of the accordion items
            acc[i].style.display = 'block'; // set their display so that they show
        }
      });
}
  /*
  * since the enter key also works as a "search" event
  * we make it so that hitting enter does nothing to 
  * avoid someone hitting enter and repopulating their
  * entire accordion on accident
  */
 if(input){
document.getElementById("txt-search").addEventListener("keypress", function(event) {
    // if the key is the enter key
    if (event.key === "Enter") {
    // essentially says "do nothing"
      event.preventDefault(); 
    }
  });
}