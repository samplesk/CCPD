var data = [
  {
  "id": "1",
  "name":"Barry Goldwater Scholarship",
  "description":"National scholarship in the natural sciences, engineering and mathematics to identify and support college sophomores and juniors who show exceptional promise of becoming the US’ next generation of research leaders in these fields. Scholarships entail up to $7,500 a year to help cover costs associated with tuition, mandatory fees, books, room and board.",
  "website":"https://goldwater.scholarsapply.org/",
  "level_of_study":"Undergraduate",
  "location":"Domestic"
  },
  {
  "id": "2",
  "name":"Benjamin A. Gilman International Scholarship",
  "description":"The U.S. Department of State’s Benjamin A. Gilman International Scholarship is a grant program that enables students of limited financial means to study or intern abroad, thereby gaining skills critical to our national security and economic competitiveness.",
  "website":"https://www.iie.org/programs/gilman-scholarship-program",
  "level_of_study":"Undergraduate",
  "location":"Abroad"
  },
  {
  "id": "3",
  "name":"Boren Awards",
  "description":"The Boren Scholarships fund intensive study of language and culture abroad by U.S. undergraduate students (25+ weeks preferred) and the Boren Fellowships fund language study by graduate students.",
  "website":"https://borenawards.org/",
  "level_of_study":"Undergraduate, Graduate",
  "location":"Abroad"
  }
  ];
  var fellowships = {}
  data.forEach(function(item) {
  if(!(item.name in fellowships))
    fellowships[item.name] = [item]
  else
    fellowships[item.name].push(item)
  })
  
  console.log(fellowships)
  var html = $.map(fellowships, function(body, fellowship) {
  return "<h3>" + fellowship + "</h3>" +
    "<div>" + $.map(body, function(item, i) {
        console.log(i, item)
        return format(item)
    }).join("") + "</div>"
  }).join("")
  
  function format(item){
  return "<div>" + $.map(item, function(line, key) {
    var div = ""
    if(line == item.description)
        div += "<p>" + line + "</p>"
    else if (line == item.website)
        div += "<a href="+ encodeURI(line)+">Visit</a></p>"
    else if(line != item.id && line != item.name)
        div += "<h4>"+key+ "</h4><div>"+line +"</div>"
  
    
    return div
  }).join("") + "</div>"
  }
  
  $(function(){
  console.log(html)
  $("#fellowship-accordion").append(html)
  //$("#fellowship-accordion").children("div").accordion()
  $("#fellowship-accordion").accordion()
  })
  console.log(html)
//--------------------------------------------------------------------------------
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }