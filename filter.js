//http://jsfiddle.net/6wYzw/41/
//https://stackoverflow.com/questions/8796472/filtering-with-checkboxes-using-jquery
var requirements = {}
var gpas = {}
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
      //console.log(fellowship);
      return $.map(body, function(item, i) {
            return $.map(item, function(line, key){
                //console.log(key)
                //console.log(line)
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
  //console.log(gpas)
}

//https://stackoverflow.com/questions/54695113/multi-condition-filtering-with-checkboxes-javascript


const completeFellowshipList = fellowships_json_data;
const requirementList = requirements_json_data;
const element = document.getElementsByTagName('h1');
//const input = document.getElementById("txt-search");

function change() {

}
//change();


//<a onclick='removePanel(this)' style='float:right'>X</a>
//Removes panel when x link is clicked
//USED: http://jsfiddle.net/gh1e4moy/
//USED: https://jqueryui.com/upgrade-guide/1.10/#added-ability-to-add-remove-panels
function removePanel(a) {
  $(a).parent().next().remove();
  $(a).parent().remove();
  return false;
}

function onCheck(event) {
  // get element that was clicked on (the checkbox)
  var tempElem = event.target
  // for each element in the accordion
  for (var i = 0; i < element.length; i++) {
    // if checkbox is checked
    if(tempElem.checked == true){
    // check the stored gpa of the element, see if its larger than the checkbox value or null
    if (gpas[i] >= tempElem.value.toLowerCase() || gpas[i] == 0) {
        element[i].style.display = "none";
     } else {
        element[i].style.display = "block";
      }
    }
      // restore all of the accordion elements if the box gets unchecked
      if(tempElem.checked == false){
        element[i].style.display = "block";
      }
    }
  }