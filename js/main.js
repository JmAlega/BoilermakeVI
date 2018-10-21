$(function(){
  var input = document.getElementById('toLink');
  input.addEventListener("keyup", function(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.keyCode == 13 ){      
      loadVideo($(this).closest('#stepOne').find('#toLink').val());
    }
  });
  $('.Link').on('click', function(){    
    loadVideo($(this).closest('#stepOne').find('#toLink').val()); 
  });  

  $('input[name=dropbox]').on('change', function(event){
    event.preventDefault();
    event.stopPropagation();    
    var name = $(event.target).val();      
    name = getName(name);    
    var url = "http://localhost:8080/scripts/script.txt";
  
    $.ajax({
      type: "GET",
      url: url,
      data: { param: name},
      success: function(data){
          $("#content").append(data);
      }

    });

    
  });
});

function loadVideo(link)
{    
  var indexOfEquals = 0;
  for(indexOfEquals = 0; indexOfEquals < link.length; indexOfEquals++){
    if(link[indexOfEquals] == '='){
      indexOfEquals += 1;
      break;
    }
  }
  var videoID = link.substr(indexOfEquals);  
  document.getElementById("myIframe").src="https://youtube.com/embed/"+videoID;
}

function getName(name){
  var lastSlash = 0;
  for(var i = 0; i < name.length; i++){
    if(name[i] == '\\') {
      lastSlash = i;      
    }
  }

  return name.substr(lastSlash+1);
}
    // var pythonScript = "./scripts/transcribe.py"
    // var { PythonShell } = require('python-shell');
    // var spawn = require('child_process').spawn();
    // let pyshell = new PythonShell(pythonScript);    
    // pyshell.send(name);
    // ps.pyshell.on('message', function(message){
    //   $("#content").append(data);
    // });
    // let options = {
    //   mode: 'text',
    //   args: [name]
    // };

    // PythonShell.run(pythonScript, options, function(err, results){
    //   if (err) throw err;
    //   $("#content").append(data);
    // })
    
    // var spawn = require("child_process").spawn;    
    // var pythonScript = spawn('python', ["./transcribe.py", name]);

    // pythonScript.stdout.on('data', (data) => {
    //   $("#content").append(data);
    // })

    // var url = "http://localhost:8080/scripts/transcribe.py?name="+name;
    // $.ajax({
    //   type:"GET",
    //   url: url,      
    //   dataType: 'text',
    //   success: function(data){
    //     alert("success.");
    //     $("#content").append(data);

    //   }
    // })

  // var formData = new FormData($('#drop-zone'));
  // var url = ""
  //   $.ajax({
  //     type: "POST",
  //     url: url,
  //     dataType: FormData,
  //     data: data,
  //     success: function(data) {
  //       alert(data);
  //     },
  //     error: function(data) {
  //       alert("failed");
  //     }
  //   });  