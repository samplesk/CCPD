//http://jsfiddle.net/6wYzw/41/
//https://stackoverflow.com/questions/8796472/filtering-with-checkboxes-using-jquery

async function createFilter(){
  /*creates fellowship dictionary with each fellowship name 
  as the key and then attaches the fellowship 
  information to each fellowship name (like a hash table)
  Does NOT display on page
  */
  var requirements = {}
  requirements_json_data.forEach(function(item) {
  if(!(item.name in requirements)){
    requirements[item.name] = [item] // adds new fellowship name to array
  }
  else
    requirements[item.name].push(item) // adds the information for that fellowship
  })

  console.log(requirements);

  cleanRequirements();
  function cleanRequirements(){
    var html = $.map(requirements, function(body, fellowship) {
      console.log(fellowship);
      return $.map(body, function(item, i) {
            console.log(i, item)
            return
        })
      })
  }
  console.log(requirements);
}




const completeFellowshipList = fellowships_json_data;
const requirementList = requirements_json_data;
const element = document.getElementsByTagName('h1');
//const input = document.getElementById("txt-search");

function change() {

}
change();


//<a onclick='removePanel(this)' style='float:right'>X</a>
//Removes panel when x link is clicked
//USED: http://jsfiddle.net/gh1e4moy/
//USED: https://jqueryui.com/upgrade-guide/1.10/#added-ability-to-add-remove-panels
function removePanel(a) {
  $(a).parent().next().remove();
  $(a).parent().remove();
  return false;
}


