var target_r_username = document.getElementById('r_username');
var target_r_email = document.getElementById('r_email');
var target_r_pwd = document.getElementById('r_pwd');


function sign_up() {
    var input_r_username = document.getElementById('r_username').value;
    var input_r_email = document.getElementById('r_email').value;
    var input_r_pwd = document.getElementById('r_pwd').value;
    console.log(input_r_username + ' ' + input_r_email + ' ' + input_r_pwd)
    
   if(input_r_username == '' || input_r_email == '' || input_r_pwd == '')
   {
       alert('Please fill all fields...')
   }
    else
    {
        //alert('chl gya');
        var user_account_details = localStorage.getItem('user_credentials');
        if(user_account_details == null)
        {
            user_account_details = [];
        }
        else
        {
            user_account_details = JSON.parse(user_account_details);
        }

        var users_detail_obj = {
            user_id: Date.now(),
            user_name: input_r_username,
            user_email: input_r_email,
            user_pwd: input_r_pwd
        }

        user_account_details.push(users_detail_obj);
        localStorage.setItem('user_credentials', JSON.stringify(user_account_details));
        localStorage.setItem('login_user', JSON.stringify(users_detail_obj));
        window.location = '../dashboard/dashboard.html';
    }
}


target_r_username.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        sign_up();
    }
})

target_r_email.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        sign_up();
    }
})

target_r_pwd.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        sign_up();
    }
})