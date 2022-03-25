/**
 * Andres Orozco
 * This is setting up the "fellowships_json_data" variable we want to hold the fellowships. The website (which looks largely like an accordion)
 * uses this variable, so we populate it with FJSON in the fetch statement. This variable used to be instantiated with information
 * already in it, but that is no longer necessary. If something goes wrong, the website will load but appear empty and the console
 * will return a message along the lines of "information could not load".
 */
 var fellowships_json_data = [];
 var requirements_json_data = []

 /**
  * Andres Orozco
  * This is the main asynchronous part. That is, this is the part that is ACTUALLY asynchronous and takes time to complete.
  * To make sure this is complete before the rest of the program, this function is called within the async function "createWebsite"
  * with the await keyword. So in the async function, this completes and THEN everything else runs.
  */
 async function loadFellowshipsJson(ms) {
  
  // Source: https://www.youtube.com/watch?v=C3dfjyft_m4&ab_channel=JonathanSoma
  await fetch("./fellowships.json")
  .then(response => response.json())
  .then(FJSON => {

    /**
     * Andres Orozco
     * "fellowships_json_data" is now created and we need to populate it with the contents of "FJSON", which we now have ready to use. This code makes
     * sure everything in FJSON is in fellowships_json_data. That is, we have loaded the fellowship information correctly and now will use it.
     */
    for (let i = 0; i < FJSON["Sheet1"].length; i++) {
      fellowships_json_data[i] = FJSON["Sheet1"][i]
    }
    for (let i = 0; i < FJSON["Sheet2"].length; i++) {
      if(FJSON["Sheet2"][i].name != "")
      requirements_json_data[i] = FJSON["Sheet2"][i]
      
    }
    if(fellowships_json_data.length != requirements_json_data.length)
      console.log("Amount of fellowships in Sheet1 do not match amount of fellowships in Sheet2")
  })
  //console.log(requirements_json_data);
  /**
   * Andres Orozco
   * If the fellowship information from fellowships.json has loaded correctly, this runs and the website looks good. Otherwise,
   * the website appears empty.
   */
  // Inspired by: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  if(fellowships_json_data.length > 0){
    return new Promise(resolve => setTimeout(resolve, ms));
  }else{
    console.log("Fellowship information could not load")
  }
}

/**
 * Andres Orozco
 * This is pretty much the entire thing in an async function. The problem I was facing was that the entire program was completing
 * before the fetch statement had a chance to load eveything. The solution is to put everything in an async function so "await"
 * basically halts everything, which is what we want to do. We WANT the entire program to wait until the JSON information
 * is loaded and usable before creating the fellowships accordion.
 */
 async function createWebsite() {

  // Make sure information is loaded before setting up the website. This was the main issue for a while.
  await loadFellowshipsJson(1);
  createAccordion();
  createFilter();
}

/**
 * Andres Orozco
 * I've found that the best way to load the correct information from "fellowships.json" and THEN proceed with the rest of the program
 * is to wrap pretty much the entire thing in an "async" function, THAT WAY I can use "await" to actually pause "the entire program".
 * Basically, if the entire program is in an async function, I can use "await" to halt the entire async function WHICH CONTAINS
 * everything. Otherwise in JavaScript, await just makes other synchronous code run while the async code does what it needs to do.
 */
createWebsite()