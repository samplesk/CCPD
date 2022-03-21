/**

 * Andres Orozco
 * This is setting up the "fellowships_json_data" variable we want to hold the fellowships. The website (which looks largely like an accordion)
 * uses this variable, so we populate it with FJSON in the fetch statement. This variable used to be instantiated with information
 * already in it, but that is no longer necessary. If something goes wrong, the website will load but appear empty and the console
 * will return a message along the lines of "information could not load".
 */
 var filter_data = [];

 /**
  * Andres Orozco
  * This is the main asynchronous part. That is, this is the part that is ACTUALLY asynchronous and takes time to complete.
  * To make sure this is complete before the rest of the program, this function is called within the async function "createWebsite"
  * with the await keyword. So in the async function, this completes and THEN everything else runs.
  */
 async function loadJson(ms, file) {
  
  // Source: https://www.youtube.com/watch?v=C3dfjyft_m4&ab_channel=JonathanSoma
  await fetch(file)
  .then(response => response.json())
  .then(FJSON => {

    /**
     * Andres Orozco
     * "fellowships_json_data" is now created and we need to populate it with the contents of "FJSON", which we now have ready to use. This code makes
     * sure everything in FJSON is in fellowships_json_data. That is, we have loaded the fellowship information correctly and now will use it.
     */
    for (let i = 0; i < FJSON.length; i++) {
        filter_data[i] = FJSON[i]
    }
  })
  
  /**
   * Andres Orozco
   * If the fellowship information from fellowships.json has loaded correctly, this runs and the website looks good. Otherwise,
   * the website appears empty.
   */
  // Inspired by: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  if(filter_data.length > 0){
    return new Promise(resolve => setTimeout(resolve, ms));
  }else{
    console.log("Fellowship filter requirements information could not load")
  }
}

/**
 * Andres Orozco
 * This is pretty much the entire thing in an async function. The problem I was facing was that the entire program was completing
 * before the fetch statement had a chance to load eveything. The solution is to put everything in an async function so "await"
 * basically halts everything, which is what we want to do. We WANT the entire program to wait until the JSON information
 * is loaded and usable before creating the fellowships accordion.
 */
 async function createWebPage() {

  // Make sure information is loaded before setting up the website. This was the main issue for a while.
  await loadJson(1, "./filter-requirements.json");
    


  /*creates fellowship dictionary with each fellowship name 
  as the key and then attaches the fellowship 
  information to each fellowship name (like a hash table)
  Does NOT display on page
  */
  var requirements = {}
  var fellowship_requirements_ids = {}
  filter_data.forEach(function(item) {
  if(!(item.name in requirements && item.name != "")){
    requirements[item.name] = [item] // adds new fellowship name to array
    fellowship_requirements_ids[item.name] = item.fellowship_id
  }
  else if (item.name != "")
    requirements[item.name].push(item) // adds the information for that fellowship
  })

  if (fellowship_requirements_ids.length != fellowship_ids.length)
    console.log("The number of fellowships and requirements do not match!")
  else
    console.log("Yay fellowships and requirements match!")

  var booleanRequirements = [
    "min_gpa",
    "min_age_requirement",
    "max_age_requirement",
    "location_of_study",
    "citizenship_requirement",
    "requires_campus_endorsement_nomination"
  ];


}
