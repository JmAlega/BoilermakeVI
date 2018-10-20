$(function(){

  var input = document.getElementById('toLink');
  input.addEventListener("keyup", function(event){
    event.preventDefault();
    event.stopPropagation();
    if(event.keyCode == 13 ){
      loadVideo($(this).closest('#stepOne').find('#toLink').val());
    }
  })
  $('#Link').on('click', function(){
    loadVideo($(this).closest('#stepOne').find('#toLink').val());   



  $('#drop-zone').on('submit', function(event){
    event.preventDefault();
    event.stopPropagation();
    var url = $(this).attr('action');
    var formData = new FormData($(this));

    var posting = $.post(url, $(this).serialize());
    posting.success(function(data){
      $(event.target).closest("stepTwo").find("#content").text() = data;   
    })

  })

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
});

function loadVideo(link)
{
  alert(link);
  var indexOfEquals = 0;
  for(indexOfEquals = 0; indexOfEquals < link.length; indexOfEquals++){
    if(link[indexOfEquals] == '='){
      indexOfEquals += 1;
      break;
    }
  }
  var videoID = link.substr(indexOfEquals);
  alert(videoID);
  document.getElementById("myIframe").src="https://youtube.com/embed/"+videoID;
}

// $(function() {
  
//   var input = document.getElementById('toLink');
//   input.addEventListener("keyup", function(event){
//     event.preventDefault();
//     event.stopPropagation();
//     if(event.keyCode == 13 ){
//       loadVideo($(this).closest('#stepOne').find('#toLink').val());
//     }
//   })
//   $('#Link').on('click', function(){
//     loadVideo($(this).closest('#stepOne').find('#toLink').val());    
//   });

  

// });