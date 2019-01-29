function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  $('#register_type').val(cityName);
}




    var username =   $.session.get("user");

 if(username != null){
  // alert('ds');
 location.href = "home.html";
 }
    
var path = 'http://bitinfous.com/nipocket/';
     var errorMsg = '', $valid = false;
  var errorMsg1 = '', $valid1 = false;
  var errorMsg2 = '', $valid2 = false;
  $.validator.addMethod("checkexist",function(val, elem){
    var register_type = $('#register_type').val();
    var t = '';
    if(register_type == 'personal'){
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
            errorMsg = 'Mobile Number Already Exist..';
            $valid = false;
         }
         else{
          //alert('t')
            $valid = true;
         }
      }
   });
   $.validator.messages["checkexist"] = errorMsg;
   return $valid;
},'');

  $.validator.addMethod("correct_referral",function(value, elem){
    var register_type = $('#register_type').val();
    var t = '';
    if(register_type == 'personal'){
    t = 'ni_personal_users';
    }else{
    t = 'ni_business_users';

    }
    
   $$.ajax({
     url:path+'home/checkexist/'+t+'/member_id/'+value,
      type:"POST",
      success:function(data){
       // alert(data);
        if(data == 'true'){
          //alert('f')
            errorMsg1 = 'Please Enetr Valid Referral Code..!';
            $valid1 = false;
         }
         else{
          //alert('t')
            $valid1 = true;
         }
      }
   });
   $.validator.messages["correct_referral"] = errorMsg1;
   return $valid1;
},'');

$.validator.addMethod("correct_otp",function(otp, elem){
    var register_type = $('#register_type').val();
    var t = '';
    if(register_type == 'personal'){
    t = 'ni_personal_users';
    }else{
    t = 'ni_business_users';

    }
    
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

   $('#signup_personal').validate({ 
    errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        refral_code: {
            number: true,
            required: true,
            maxlength: 8,
            minlength: 8,
            correct_referral:true,
        },
        full_name: {
            required: true
           
        },
        mobile: {
           number: true,
            required: true,
            maxlength: 10,
            minlength: 10,
            checkexist: true,
        },
        email: {
            required: true
        },
        password: {
            required: true,
            //  maxlength: 8,
            // minlength: 8,
        }
    },
    messages: {
       
        refral_code: {
            number: "Please Enter Numeric",
            required: "Please enter  Referral Code.",
          minlength: "Reffral Code must consist of at least 8 Digit",
          malength: "Reffral Code must consist of at least 8 Digit",
        },
         full_name: {
            required: "Please enter your Full name.",
            
        },
        mobile: {
            number: "Please Enter Numeric",
            required: "Please enter  mobile.",
          minlength: "Mobile Number must consist of at least 10 Digit",
          malength: "Mobile Number must consist of at least 10 Digit",
        },
        email: {
            required: "Please enter your email."
        },
         password: {
            required: "Please enter  Password.",
          //    minlength: "Password must consist of at least 8 Digit",
          // malength: "Password must consist of at least 8 Digit",
        },
    },
    submitHandler: function(form) {
     var mobile = $('#personalmobile').val();  
     var username = $('#full_name').val();  
      form =$('#signup_personal').serialize();
     $$.ajax({
            url: path+"api/register_users/", 
            type: "POST",
            data:form,             
           
            success: function(data) {
              //alert(data);
               var d = $.parseJSON(data);
              if(d.status == 1){
              $('#type').append('<input type="hidden" name="type" value="personal"><input type="hidden" name="device_type" value="Web"><input type="hidden" name="mobile" value="'+mobile+'"><input type="hidden" name="username" id="username" value="'+username+'">');
      $('#createOrder').modal('show');

              }
            }
        });
     //    return false;
    },
    }); 






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
        $.session.set('user',user_name) 
             location.href = "home.html";
              }else{
                $('#er').html(d.message);
              }
            }
        });
     //    return false;
    },
    }); 


















  $('#signup_business').validate({ 
    errorLabelContainer: "#cs-error-note",
   
     errorClass: 'errors',
    rules: {
     
        sponsor_id: {
            number: true,
            required: true,
            maxlength: 8,
            minlength: 8,
            correct_referral:true,
        },
        buisness_name: {
            required: true,
           

           
        },
         owner_name: {
            required: true,
           

           
        },
        mobile: {
           number: true,
            required: true,
            maxlength: 10,
            minlength: 10,
            checkexist: true,
        },
        email: {
            required: true
        },
        password: {
            required: true,
            //  maxlength: 8,
            // minlength: 8,
        }
    },
    messages: {
       
        sponsor_id: {
            number: "Please Enter Numeric",
            required: "Please enter  Referral Code.",
          minlength: "Reffral Code must consist of at least 8 Digit",
          malength: "Reffral Code must consist of at least 8 Digit",
        },
         buisness_name: {
            required: "Please enter your Business name.",
            
        },
        owner_name: {
            required: "Please enter  Owner Name.",
            
        },
        mobile: {
            number: "Please Enter Numeric",
            required: "Please enter  mobile.",
          minlength: "Mobile Number must consist of at least 10 Digit",
          malength: "Mobile Number must consist of at least 10 Digit",
        },
        email: {
            required: "Please enter your email."
        },
         password: {
            required: "Please enter  Password.",
          //    minlength: "Password must consist of at least 8 Digit",
          // malength: "Password must consist of at least 8 Digit",
        },
    },
    submitHandler: function(form) {
     var mobile = $('#businessmobile').val();  
     var username = $('#buisness_name').val();  
      form =$('#signup_business').serialize();
     $$.ajax({
            url: path+"api/register_users/", 
            type: "POST",
            data:form,             
           
            success: function(data) {
              //alert(data);
               var d = $.parseJSON(data);
              if(d.status == 1){
              $('#type').append('<input type="hidden" name="type" value="business"><input type="hidden" name="device_type" value="Web"><input type="hidden" name="mobile" value="'+mobile+'"><input type="hidden" name="username" id="username" value="'+username+'">');
      $('#createOrder').modal('show');

              }
            }
        });
     //    return false;
    },
    }); 

