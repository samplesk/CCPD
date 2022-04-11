//http://jsfiddle.net/6wYzw/41/
//https://stackoverflow.com/questions/8796472/filtering-with-checkboxes-using-jquery
var requirements = {}
var gpas = {}
var L_O_S = {}
var Locations = {}
var Citizenships = {}
var Endorsement = {}
async function createFilter(){
  /*creates fellowship dictionary with each fellowship name 
  as the key and then attaches the fellowship 
  information to each fellowship name (like a hash table)
  Does NOT display on page
  */
  requirements_json_data.forEach(function(item) {
  if(!(item.name in requirements)){
    requirements[item.name] = [item] // adds new fellowship name to array
  }
  else
    requirements[item.name].push(item) // adds the information for that fellowship
  })

  cleanRequirements();
  function cleanRequirements(){
    var html = $.map(requirements, function(body, fellowship) {
      return $.map(body, function(item, i) {
            return $.map(item, function(line, key){
                if(line != null && typeof line === 'string'){
                  line = line.toLowerCase();
                }
                return 
            })
        })
      })
  }
  // mapping for gpas of all fellowships to ease filtering
  // puts all the gpas into an array for easier comparisons
   gpas = $.map(requirementList, function(item){
    if(!item.min_gpa){ // if gpa is null just set it to 0
      item.min_gpa = 0.0
    }
     return item.min_gpa
   })
   // maps all of the levels of study for each fellowship
   L_O_S = $.map(completeFellowshipList, function(item){
     // if it contains under, assume it is undergrad and assign 0
     if(item.level_of_study.toLowerCase().match("under")){
       return 0
     } else {
       // otherwise assume graduate and assign 1
       return 1
     }
   })
   Locations = $.map(completeFellowshipList, function(item){
     if(item.location_of_study.toLowerCase().match("domestic")){
       return 0
     } else {
       return 1
     }
   })
   Citizenships = $.map(completeFellowshipList, function(item){
     if(item.citizenship.toLowerCase().match("yes")){
       return "yes"
     } else {
       return "no"
     }
   })
   Endorsement = $.map(completeFellowshipList, function(item){
     if(item.requires_campus_endorsement_nomination.toLowerCase().match("yes")){
       return "yes"
     } else {
       return "no"
     }
   })
}

//https://stackoverflow.com/questions/54695113/multi-condition-filtering-with-checkboxes-javascript


const completeFellowshipList = fellowships_json_data;
const requirementList = requirements_json_data;
const element = document.getElementsByTagName('h1');


//<a onclick='removePanel(this)' style='float:right'>X</a>
//Removes panel when x link is clicked
//USED: http://jsfiddle.net/gh1e4moy/
//USED: https://jqueryui.com/upgrade-guide/1.10/#added-ability-to-add-remove-panels
function removePanel(a) {
  $(a).parent().next().remove();
  $(a).parent().remove();
  return false;
}

function onCheckGPA(event) {
  // set accordion elements to not-active
  set_accordion_inactive()
  // get element that was clicked on (the checkbox)
  var tempElem = event.target
  // for each element in the accordion
  for (var i = 0; i < element.length; i++) {
    // if checkbox is checked
    if(tempElem.checked == true){
    // check the stored gpa of the element, see if its larger than the checkbox value or null, and make sure it is not already hidden
      if ((gpas[i] >= tempElem.value.toLowerCase() || gpas[i] == 0) && element[i].style.display != "none") {
          element[i].style.display = "block"
       } else {
          element[i].style.display = "none"
        }
    }
      // restore all of the accordion elements if the box gets unchecked
      if(tempElem.checked == false){
        element[i].style.display = "block"
      }
    }
  }

  /*
  * Check the level of study for each fellowship for filtering
  */
  function onCheckLevel(event) {
    set_accordion_inactive() // set all accordion elements inactive for filtering
    var tempElem = event.target // get checkbox
    for(var i = 0; i < element.length; i++){ // check each fellowship
      if(tempElem.checked == true) { // if the box is checked
        // currently just checking the first letter against the value of 
        // level_of_study to make filtering from 'undergrad' & 'graduate'
        if((L_O_S[i] == tempElem.value) && element[i].style.display != "none"){
          element[i].style.display = "block" // show if matching
        } else {
          element[i].style.display = "none" // hide if not
        }
      }
      if(tempElem.checked == false){ // if box gets unchecked show all
        element[i].style.display = "block"
      }
    }
  }

  /*
  *
  */
 function onCheckLocation(event){
   set_accordion_inactive()
  var tempElem = event.target
  for(var i = 0; i < element.length; i++){
    if(tempElem.checked == true){
      if((Locations[i] == tempElem.value) && element[i].style.display != "none"){
        element[i].style.display = "block"
      } else {
        element[i].style.display = "none"
      } 
    }
    if(tempElem.checked == false) {
      element[i].style.display = "block"
    }
  }
 }
 /*
 *
 */
function onCheckCitizenship(event){
  set_accordion_inactive()
  var tempElem = event.target
  for(var i = 0; i < element.length; i++){
    if(tempElem.checked == true){
      if((Citizenships[i] == tempElem.value) && element[i].style.display != "none"){
        element[i].style.display = "block"
      } else {
        element[i].style.display = "none"
      }
    }
    if(tempElem.checked == false){
      element[i].style.display = "block"
    }
  }
}
/*
*
*/
function onCheckEndorsement(event){
  set_accordion_inactive()
  var tempElem = event.target
  for(var i = 0; i < element.length; i++){
    if(tempElem.checked == true){
      if((Endorsement[i] == tempElem.value) && element[i].style.display != "none"){
        element[i].style.display = "block"
      } else {
        element[i].style.display = "none"
      }
    }
    if(tempElem.checked == false){
      element[i].style.display = "block"
    }
  }
}
  /*
  * Good to call before doing any sort of searching/filtering
  * sets the accordion to non-active everywhere so that no secitons 
  * of the accordion are left open to bug out
  */
  function set_accordion_inactive(){
  // Set all the accordion elements to not active
  // gets hearders of accordion and sets them to not active
   $('#fellowship-accordion').accordion("option", "active", -1);
   // Then grabs the children of the header to also set them to not active
   jQuery('.fellowship-accordion, .childAccordion').accordion({
    collapsible: true,
    active: false,
    heightStyle: 'content'
    ,
    // actually sets all of the accordion children to non-active
    beforeActivate: function (e, ui) {
        if($(this).hasClass('fellowship-accordion')){
            $('.childAccordion').accordion("option", "active", -1);
        }
    }
});
  }