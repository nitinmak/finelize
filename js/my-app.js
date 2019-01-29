// Initialize app

var myApp = new Framework7({
  dialog: {
    // set default title for all dialog shortcuts
    title: 'My App',
    // change default "OK" button text
    buttonOk: 'Done',
  }
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

var app = {
 // Application Constructor
   initialize: function() {
       this.bindEvents();
   },

   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function() {

      document.addEventListener('deviceready', this.onDeviceReady, false);

   },

   onDeviceReady: function() {
       document.addEventListener("backbutton", onBackKeyDown, false);
   }


};

// Handle Cordova Device Ready Event
    $$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
     $('.otp_verify').click(function() {
        $("#otp_verify").valid();
    });
     
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
     // myApp.dialog.preloader();
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
    //alert('html');
             //location.href = "about.html";
             $('#links').append('<a href="home.html" id="home_link" name="home"></a>');
              $('#home_link')[0].click();
              }else if(d.result == 'verification_pending'){

                 myApp.modal({
    title:  'Email Varification',
                
    text: 'OTP Sent On Your Register Email<br>  <form id="verify_otp" method="post"> <div class="form-left-w3l " id="tt" ><input style="width: 100%;" name="otp" id="otp" type="text" placeholder="Enter OTP here"><input type="hidden" name="type" id="type" value="'+d.login_type+'"><input type="hidden" name="device_type" value="Web"><input type="hidden" name="mobile" value="'+d.mobile+'"><input type="hidden" name="username" id="username" value="'+d.username+'"><input type="hidden" name="secrete" value="Penisking"><br><lable class="errors" id="er"></lable></div><button type="button" class="otp_verify btn btn-primary" value="Signin">SignIn</button>   </form> ',
   
  })
             // $('#tt').append('<input type="hidden" name="type" id="type" value="'+d.login_type+'"><input type="hidden" name="device_type" value="Web"><input type="hidden" name="mobile" value="'+d.mobile+'"><input type="hidden" name="username" id="username" value="'+d.username+'">');
          // $('#createOrder').modal('show');
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

   
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes aout page');

})
myApp.onPageInit('home', function (page) {
    // Do something here for "about" page
    

})
myApp.onPageInit('signup', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
    $$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
    if (page.name === 'signup') {
    //myApp.alert('Here DSDSDSDS');

        
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
            
            })
    }else if (page.name === 'index') {
        //location.reload(true);
    }else if (page.name === 'home') {

    window.close();

    //myApp.alert('Here resturant');
     var path = 'http://bitinfous.com/nipocket/';
       $('.loader').css('background-color',' transparent');

$('.loader').show();

 $$.ajax({
     url:path+'api/show_all_resturant/',
      type:"POST",
      data:{"secrete": 'Penisking'},
       success: function(response) {
        //myApp.alert(response);
        $('.loader').hide();

         var json = $.parseJSON(response);
        jQuery.each(json['data'], function(index, value) {
          
          $("#resturant_list").append('<div class="col text-center" style="background-color: rgba(255, 255, 255, 0.7);margin: 5px;padding:10px;border-radius: 20px;"><img  src="'+path+'assest/resturant/'+value.image+'" style="width: 150px;height: 150px;"><h5 class="text-center">'+value.name+'</h5><h6 class="text-center">'+value.area+'</h6><div>'+value.rating+'*</div><div>'+value.category+'</div><div>'+value.budget+'</div>');
            //now you can access properties using dot notation
        });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
       myApp.alert("some error");
    }

     
// 
        
   

});
    }
});

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
   // myApp.alert('Here comes fdfd page');
})
$$(document).on('pageInit', '.page[data-page="home"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here refdfdfsturant');
    
    
})

$$(document).on('pageInit', '.page[data-page="signup"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes Sign UP page');
     
  
})