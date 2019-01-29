// var username =   $.session.get("user");

//  if(username == null){
//   // alert('ds');
//  location.href = "index.html";
//  }else{

//  $('.user_name').html(username);
//  }
 var path = 'http://bitinfous.com/nipocket/';
       $('.loader').css('background-color',' transparent');

$('.loader').show();

 $.ajax({
     url:path+'api/show_all_resturant/',
      type:"POST",
      data:{"secrete": 'Penisking'},
       success: function(response) {
        $('.loader').hide();
         var json = $.parseJSON(response);
        jQuery.each(json['data'], function(index, value) {
          
          $("#resturant_list").append('<div class="col text-center" style="background-color: rgba(255, 255, 255, 0.7);margin: 5px;padding:10px;border-radius: 20px;"><img  src="'+path+'assest/resturant/'+value.image+'" style="width: 125px;height: 125px;"><h5 class="text-center">'+value.name+'</h5><h6 class="text-center">'+value.area+'</h6><div>'+value.rating+'*</div><div>'+value.category+'</div><div>'+value.budget+'</div>');
            //now you can access properties using dot notation
        });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("some error");
    }

     
// 
        
   

});


 $(document).on('click', '.add_money', function(event){  
    // alert('here');
 })