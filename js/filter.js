//https://jsfiddle.net/6wYzw/41/
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
   gpas = $.map(completeFellowshipList, function(item){
    if(!item.gpa){ // if gpa is null just set it to 0
      item.gpa = 0.0
    }
     return item.gpa
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
   
   //location of study domestic 0, otherwise 1
   Locations = $.map(completeFellowshipList, function(item){
     if(item.location_of_study.toLowerCase().match("domestic")){
       return 0
     } else {
       return 1
     }
   })
   
   //citizenship requirement Y/N
   Citizenships = $.map(completeFellowshipList, function(item){
     if(item.citizenship.toLowerCase().match("yes")){
       return "yes"
     } else {
       return "no"
     }
   })

   //requires campus endorsement Y/N
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
//USED: https://jsfiddle.net/gh1e4moy/
//USED: https://jqueryui.com/upgrade-guide/1.10/#added-ability-to-add-remove-panels
function removePanel(a) {
  $(a).parent().next().remove();
  $(a).parent().remove();
  return false;
}


/*
* Check the GPA for each fellowship 
*/
function onCheckGPA(event) {
  // set accordion elements to not-active
  set_accordion_inactive()
  // get element that was clicked on (the checkbox)
  const gpaButtons = document.querySelectorAll('input[name="gpa"]');
    for(const gpaButton of gpaButtons){
              gpaButton.addEventListener('change', function(e){
              //if the gpaButton is checked
              if (this.checked){
                //loop through the length of the element
                for(var i = 0; i < element.length; i++){
                  //if the gpa is greater than the value clicked or equal to 0, AND the element is being displayed
                  if((gpas[i] >= this.value || gpas[i] == 0) && element[i].style.display != "none"){
                    element[i].style.display = "block"; //display
                  } else {
                    element[i].style.display = "none"; //do not display
                  }
                }
              } else {
                //if the gpaButton is not checked
              }
            });
        }
}

  /*
  * Check the level of study for each fellowship
  * Depending on what the user clicks fellowships are displayed or removed
  */
  function onCheckLevel(event) {
    set_accordion_inactive() // set all accordion elements inactive for filtering
    // get element that was clicked on (the checkbox)
    const levelButtons = document.querySelectorAll('input[name="level_of_study"]');
    for(const levelButton of levelButtons){
              levelButton.addEventListener('change', function(e){
              if (this.checked){
                for(var i = 0; i < element.length; i++){
                  //if the level of study is the same as the value clicked AND the element is being displayed 
                  if(L_O_S[i] == this.value && element[i].style.display != "none"){
                    element[i].style.display = "block";//display
                  } else {
                    element[i].style.display = "none";//do not display
                  }
                }
              }
            });
        }
  }

  /*
  * 
  */
 function onCheckLocation(event){
   set_accordion_inactive() // set all accordion elements inactive for filtering
   // get element that was clicked on (the checkbox)
   const locationButtons = document.querySelectorAll('input[name="location"]');
   for(const locationButton of locationButtons){
            locationButton.addEventListener('change', function(e){
             if (this.checked){
               for(var i = 0; i < element.length; i++){
                  //if the location is the same as the value clicked AND the element is being displayed 
                  if(Locations[i] == this.value && element[i].style.display != "none"){
                    element[i].style.display = "block";//display
                 } else {
                    element[i].style.display = "none";//do not display
                 }
               }
             }
           });
       }
 }

 /*
 *
 */
function onCheckCitizenship(event){
  set_accordion_inactive() // set all accordion elements inactive for filtering
  // get element that was clicked on (the checkbox)
  const citizenshipButtons = document.querySelectorAll('input[name="citizenship"]');
  for(const citizenshipButton of citizenshipButtons){
            citizenshipButton.addEventListener('change', function(e){
            if (this.checked){
              for(var i = 0; i < element.length; i++){
                //if the level of study is the same as the value clicked AND the element is being displayed 
                if(Citizenships[i] == this.value && element[i].style.display != "none"){
                  element[i].style.display = "block";//display
                } else {
                  element[i].style.display = "none";//do not display
                }
              }
            }
          });
      }
}

/*
*
*/
function onCheckEndorsement(event){
  set_accordion_inactive() // set all accordion elements inactive for filtering
  // get element that was clicked on (the checkbox)
  const endorsementButtons = document.querySelectorAll('input[name="endorsement_nomination"]');
  for(const endorsementButton of endorsementButtons){
            endorsementButton.addEventListener('change', function(e){
            if (this.checked){
              for(var i = 0; i < element.length; i++){
                //yes or no option if an endorsement is required
                //match what was clicked with the fellowship info AND the element is being displayed 
                if(Endorsement[i] == this.value && element[i].style.display != "none"){
                  element[i].style.display = "block";//display
                } else {
                  element[i].style.display = "none";//do not display
                }
                // restore all of the accordion elements if the box gets unchecked
                if(tempElem.checked == false){
                  element[i].style.display = "block"
                }
              }
            }
          });
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
    heightStyle: 'content',
    //sets all of the accordion children to non-active
    beforeActivate: function (e, ui) {
        if($(this).hasClass('fellowship-accordion')){
            $('.childAccordion').accordion("option", "active", -1);
        }
    }
});
  }