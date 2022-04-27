//https://jsfiddle.net/6wYzw/41/
var requirements = {}
const completeFellowshipList = fellowships_json_data;
const requirementList = requirements_json_data;
const element = document.getElementsByTagName('h1');
async function createFilter(){


  // /*
  // * creates fellowship dictionary with each fellowship name
  // * as the key and then attaches the fellowship
  // * information to each fellowship name (like a hash table)
  // * Does NOT display on page
  // */
  // requirements_json_data.forEach(function(item) {
  // if(!(item.name in requirements)){
  //   requirements[item.name] = [item] // adds new fellowship name to array
  // }
  // else
  //   requirements[item.name].push(item) // adds the information for that fellowship
  // })

  // cleanRequirements();
  // function cleanRequirements(){
  //   var html = $.map(requirements, function(body, fellowship) {
  //     return $.map(body, function(item, i) {
  //           return $.map(item, function(line, key){
  //               if(line != null && typeof line === 'string'){
  //                 line = line.toLowerCase();
  //               }
  //               return
  //           })
  //       })
  //     })
  // }

   /*
   * Colton Stone, 4/22/2022
   * All of the following code is used to allow the radio boxes to filter together.
   */
  // const accord = document.querySelectorAll('#fellowship-accordion')
  const radioButtons = Array.prototype.slice.call(document.querySelectorAll("input[type='radio']"))
  /*
  * This function is what does the filtering. It takes each radio button then
  * gets its label/name and value. Using this we store the button if it is checked,
  * Next we make arrays of the fellowship requirements and their corresponding values
  * we loop through the whole list of fellowships, and for each fellowship we check
  * all of its requirements. For all of the requirements we check to see if there is
  * a checkbox that matches a requirement. If one is found we make sure that the values are
  * appropriate and that it is the correct requirement. Then we push the fellowship index
  * into an array that will be used to hide items accordingly.
  */
  const applyFilter = () => {
    // get current checked buttons
    const checked_buttons = [...radioButtons].filter(item => item.checked && item.value)
    // store checked buttons in an easier formant with labels
    var checkArr = {}
    checkArr = $.map(checked_buttons, function(item){
      let name = item.name
      let value = item.value
       return {
         'button': name,
         'value': value
        }
     });
     // get all keys and values of our fellowships
  const fellowship_list_keys = [...completeFellowshipList].map(item => Object.keys(item));
  const fellowship_list_values = [...completeFellowshipList].map(item => Object.values(item));
  var index_to_hide = [];
  // for all of the fellowships
    for(let i = 0; i < completeFellowshipList.length; i++){
      // and all of the requirements in each fellowship
      for(let j = 0; j < fellowship_list_keys[i].length; j++){
        // for each button pressed
        for( let k  = 0; k < checkArr.length;k++){
          // if it matches check the type of data it is
          if(fellowship_list_keys[i][j].includes(checkArr[k].button)){
            // for strings make sure they match and that the button matches the requirement name
            if(typeof fellowship_list_values[i][j] == "string"){
              if(fellowship_list_values[i][j].includes(checkArr[k].value) && fellowship_list_keys[i][j] == checkArr[k].button){
              //  do nothing so it stays visible
              }else {
                index_to_hide.push(i)
              }
              // for numbers make sure the value is equal to or greate than the button value
              // leave zeros in for fellowships that do not specify a gpa requirement
            } else if(typeof fellowship_list_values[i][j] == "number"){
                if(fellowship_list_values[i][j] >= checkArr[k].value || fellowship_list_values[i][j] === 0){
                //  do nothing so it stays visible
                } else {
                  index_to_hide.push(i)
              }
            }  
          }
        }
      }
    }
  //set accordion inactive to prepare to filter
  set_accordion_inactive()
  // for all elements see if it is meant to be hidden or not
  // then display accordingly
  for(let i = 0; i < element.length;i++){
    if(index_to_hide.includes(i)){
      element[i].style.display = "none"
    } else {
      element[i].style.display = "block"
    }
  }
  // reset array to empty so that there is not overlap
  // on multiple runs.
  index_to_hide = []
  }
  // give each radio button an event listener
  radioButtons.forEach(radioButton => radioButton.addEventListener('change',applyFilter));
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