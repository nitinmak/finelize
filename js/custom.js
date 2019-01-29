function openCity1(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
 
  evt.currentTarget.className += " active";
  $('#login_type').val(cityName);
}


var path = 'http://bitinfous.com/nipocket/';
     var errorMsg = '', $valid = false;
     var errorMsg2 = '', $valid2 = false;
  
  $.validator.addMethod("checkexist",function(val, elem){
    var login_type = $('#login_type').val();
    var t = '';
    if(login_type == 'personal'){
    t = 'ni_personal_users';
    }else{
    t = 'ni_business_users';

    }
    
   $$.ajax({
      url:path+'home/checkexist/'+t+'/mobile/'+val,
      type:"POST",
      success:function(response){
        //alert(response);
         if(response == 'false'){
          //alert('f')
            
            $valid = true;
         }
         else{
          //alert('t')
            errorMsg = 'Mobile Number Not Register..';
            $valid = false;
         }
      }
   });
   $.validator.messages["checkexist"] = errorMsg;
   return $valid;
},'');




  $('#login').validate({ 
    errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
       
        mobile: {
           number: true,
            required: true,
            maxlength: 10,
            minlength: 10,
            checkexist: true,
        },
        password: {
            required: true,
            //  maxlength: 8,
            // minlength: 8,
        }
    },
    messages: {
       
        
        mobile: {
            number: "Please Enter Numeric",
            required: "Please enter  mobile.",
          minlength: "Mobile Number must consist of at least 10 Digit",
          malength: "Mobile Number must consist of at least 10 Digit",
        },
       
         password: {
            required: "Please enter  Password.",
          //    minlength: "Password must consist of at least 8 Digit",
          // malength: "Password must consist of at least 8 Digit",
        },
    },
    submitHandler: function(form) {
     var mobile = $('#mobile').val();  
     
      form =$('#login').serialize();
     $$.ajax({
            url: path+"api/login", 
            type: "POST",
            data:form,             
           
            success: function(data) {
              //alert(data);
               var d = $.parseJSON(data);
              if(d.status == 1){
 // $$.session.set('user',d.username) 
             //location.href = "about.html";
             $('.pages').load('home.html');
              }else if(d.result == 'verification_pending'){
              $('#tt').append('<input type="hidden" name="type" id="type" value="'+d.login_type+'"><input type="hidden" name="device_type" value="Web"><input type="hidden" name="mobile" value="'+d.mobile+'"><input type="hidden" name="username" id="username" value="'+d.username+'">');
      $('#createOrder').modal('show');
            }else{
                //alert('gf');
                $('#login_err').html(d.message);
              }
            }
        });
     //    return false;
    },
    }); 



$.validator.addMethod("correct_otp",function(otp, elem){
    var type = $('#type').val();
    //alert(type);
    var t = '';
    if(type == 'personal'){
    t = 'ni_personal_users';
    }else{
    t = 'ni_business_users';

    }
    //alert(t);
    
   $$.ajax({
     url:path+'home/checkexist/'+t+'/otp/'+otp,
      type:"POST",
      success:function(data){
       // alert(data);
        if(data == 'true'){
          //alert('f')
            errorMsg2 = 'Please Enetr Valid OTP..!';
            $valid2 = false;
         }
         else{
          //alert('t')
            $valid2 = true;
         }
      }
   });
   $.validator.messages["correct_otp"] = errorMsg2;
   return $valid2;
},'');

 $('#verify_otp').validate({ 
    errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        otp: {
            number: true,
            required: true,
            maxlength: 6,
            minlength: 6,
            correct_otp:true,
        }
  
    },
    messages: {
       
        otp: {
            number: "Please Enter Numeric",
            required: "Please enter  OTP.",
          minlength: "OTP must consist of at least 6 Digit",
          malength: "OTP must consist of at least 6 Digit",
        },
        
    },
    submitHandler: function(form) {
     var user_name = $('#username').val();  
      
      form =$('#verify_otp').serialize();
     $$.ajax({
            url: path+"api/otp_verify", 
            type: "POST",
            data:form,             
           
            success: function(data) {
              //alert(data);
               var d = $.parseJSON(data);
              if(d.status == 1){
                $('#er').html('');
                //alert(user_name);
        // $$.session.set('user',user_name) 
             location.href = "home.html";
              }else{
                $('#er').html(d.message);
              }
            }
        });
     //    return false;
    },
    }); 