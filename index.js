
var target_s_email = document.getElementById('s_email');
var target_s_pwd = document.getElementById('s_pwd');

function sign_in() 
{
    var input_s_email = document.getElementById('s_email').value;
    var inpur_s_pwd = document.getElementById('s_pwd').value;

    if(input_s_email == '' || inpur_s_pwd == '')
    {
        alert('Please fill all fields');
    }

    else
    {
        var user_info = localStorage.getItem('user_credentials');
        if(user_info == null)
        {
            user_info = [];
        }
        else
        {
            user_info = JSON.parse(user_info);
        }

        
        var check_email_pwd = user_info.filter(user => {
            if(user.user_email == input_s_email && user.user_pwd == inpur_s_pwd)
            {
                return true;
            }
        })

        if(check_email_pwd.length)
        {
            localStorage.setItem('login_user', JSON.stringify(check_email_pwd[0]));
            window.location = 'pages/dashboard/dashboard.html';
        }
        else
        {
            alert('Error, Something Wrong');
        }
    }
}


target_s_email.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        sign_in();
    }
})


target_s_pwd.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        sign_in();
    }
})