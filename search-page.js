var data = [
    {
        "id": "1",
        "name":"Barry Goldwater Scholarship",
        "website":"https://goldwater.scholarsapply.org/",
        "level_of_study":"Undergraduate",
        "location":"Domestic"
    },
    {
        "id": "2",
        "name":"Benjamin A. Gilman International Scholarship",
        "website":"https://www.iie.org/programs/gilman-scholarship-program",
        "level_of_study":"Undergraduate",
        "location":"Abroad"
    },
    {
        "id": "3",
        "name":"Boren Awards",
        "website":"https://borenawards.org/",
        "level_of_study":"Undergraduate or Graduate",
        "location":"Abroad"
    },
    {
        "id": "4",
        "name":"Charles B. Rangel Graduate Fellowship",
        "website":"http://rangelprogram.org/graduate-fellowship-program/",
        "level_of_study":"Graduate",
        "location":"Domestic"
    },
    {
        "id": "5",
        "name":"Critical Language Scholarship",
        "website":"https://clscholarship.org/",
        "level_of_study":"Undergraduate",
        "location":"Abroad"
    },
    {
        "id": "6",
        "name":"Ford Foundation Predoctoral Fellowships",
        "website":"https://sites.nationalacademies.org/PGA/FordFellowships/PGA_171962",
        "level_of_study":"Graduate",
        "location":"Domestic"
    },
    {
        "id": "7",
        "name":"Gates Cambridge Scholarship",
        "website":"https://civi.gatescambridge.org/",
        "level_of_study":"Graduate",
        "location":"Abroad"
    },
    {
        "id": "8",
        "name":"George J. Mitchell Scholarship",
        "website":"https://www.us-irelandalliance.org/mitchellscholarship",
        "level_of_study":"Graduate",
        "location":"Abroad"
    },
    {
        "id": "9",
        "name":"Harry S. Truman Scholarship",
        "website":"https://www.truman.gov/candidates",
        "level_of_study":"Graduate",
        "location":"Domestic"
    },
    {
        "id": "10",
        "name":"Boren Awards",
        "website":"https://borenawards.org/",
        "level_of_study":"Undergraduate, Graduate",
        "location":"Abroad"
    }
  ]
  var fellowships = {}
  data.forEach(function(item) {
  if(!(item.name in fellowships))
    fellowships[item.name] = [item]
  else
    fellowships[item.name].push(item)
  })
  
  console.log(fellowships)
  var html = $.map(fellowships, function(body, fellowship) {
  return "<h2>" + fellowship + "</h2>" +
    "<div>" + $.map(body, function(item, i) {
        console.log(i, item)
        return format(item)
    }).join("") + "</div>"
  }).join("")
  
  function format(item){
  return "<div>" + $.map(item, function(line, key) {
    var div = ""
    if(line == item.description)
        div += "<h3>" + line + "</h3>"
    else if (line == item.website)
        div += "<h4><a href="+ encodeURI(line)+">Visit</a></h4>"
    else if(line != item.id && line != item.name)
        div += "<h4>"+key+ "</h4><div><p1>"+line +"</p1></div>"
  
    
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