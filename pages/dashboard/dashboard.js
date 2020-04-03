
var expenseId;
var count_rows = 0;
var action = '';

function get_todos()
{
    var todos = new Array;
    var todo_str = localStorage.getItem('expense_todo');
    if(todo_str != null)
    {
        todos = JSON.parse(todo_str);
    }
    return todos;
}

function add_todo()
{
    var input_exp_name = document.getElementById('exp_name').value
        input_exp_name = input_exp_name.toLowerCase();
        input_exp_name.style = 'text-transform: capitalize';
    var input_exp_amount = document.getElementById('exp_amount').value;

    if(input_exp_name == '' || input_exp_amount == '')
    {
        alert('Please fill all fields')
    }

    else
    {
        var active_user = JSON.parse(localStorage.getItem('login_user'));
        active_user_id = active_user.user_id;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');    
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;

        var expense_obj = {
            user_id: active_user_id,
            expense_id: Date.now(),
            expense: input_exp_name,
            amount: input_exp_amount,
            created_at: today
        }

        var todos = get_todos();
            todos.push(expense_obj);
            localStorage.setItem('expense_todo', JSON.stringify(todos));

            show_todo();
            document.getElementById('exp_name'). value = '';
            document.getElementById('exp_amount').value = '';
    }
}

function remove(e) {
    var id = e.id;
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('expense_todo', JSON.stringify(todos));
    localStorage.setItem('login_user_expenses', JSON.stringify(todos));
    location.reload();
     //show_todo();
 
    return false;

}

// function remove(e)
// {
//     var exp_id = e.id;
//     // alert(exp_id);
//     var expense_list = JSON.parse(localStorage.getItem('expense_todo'));
//     var index_num = expense_list.findIndex(indx => indx.expense_id == exp_id);
//     //alert(index_num);
//     expense_list.splice(index_num, 1);
//     // console.log(expense_list);
//     localStorage.setItem('expense_todo', JSON.stringify(expense_list));

//     show_todo();
// }

function update(e) 
{
    expenseId = e.id;
    console.log(expenseId);
    action = 'update';
    console.log(action);
    var target_add_btn = document.getElementById('add_btn');
        target_add_btn.style = 'display:none';
    
    var target_upd_btn = document.getElementById('upd_btn');
        target_upd_btn.style = 'display:inline-block';

    var target_del_btn = document.getElementById('del_btn');
        target_del_btn.style = 'display:inline-block';

   

    var upd_exp = JSON.parse(localStorage.getItem('login_user_expenses'));
    var get_exp_upd = upd_exp.filter(exp_upd_id => {
        if(exp_upd_id.expense_id == expenseId)
        {
            return true;
            
        }
    })
    if(get_exp_upd.length)
    {
        localStorage.setItem('get_upd_exp', JSON.stringify(get_exp_upd[0]));
        var get_val = JSON.parse(localStorage.getItem('get_upd_exp'));

        document.getElementById('exp_name').value = get_val.expense;
        document.getElementById('exp_amount').value = get_val.amount; 
    }

}

function update_item()
{
    var input_exp_name = document.getElementById('exp_name').value
        input_exp_name = input_exp_name.toLowerCase();
    var input_exp_amount = document.getElementById('exp_amount').value;

    if(input_exp_name == '' || input_exp_amount == '')
    {
        alert('Please fill all fields')
    }

    else
    {
        var active_user = JSON.parse(localStorage.getItem('login_user'));
        active_user_id = active_user.user_id;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');    
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;

        var expense_obj = {
            user_id: active_user_id,
            expense_id: Date.now(),
            expense: input_exp_name,
            amount: input_exp_amount,
            created_at: today
        }

        var expense_list = JSON.parse(localStorage.getItem('expense_todo'));
    
        var index_num = expense_list.findIndex(indx => indx.expense_id == expenseId);
        // alert(index_num);
    
        expense_list[index_num] = expense_obj;
        console.log(expense_list);
        
        localStorage.setItem('expense_todo', JSON.stringify(expense_list));
        show_todo();
        reset();
        
    }
}

function back_btn()
{
    var target_add_btn = document.getElementById('add_btn');
        target_add_btn.style = 'display:inline-block';
    
    var target_upd_btn = document.getElementById('upd_btn');
        target_upd_btn.style = 'display:none';

    var target_del_btn = document.getElementById('del_btn');
        target_del_btn.style = 'display:none';
}

function show_todo() 
{
    var todos = get_todos();
    var total_amount = 0;

    var active_user = JSON.parse(localStorage.getItem('login_user'));
    var active_user_id = active_user.user_id;
    var active_user_name = active_user.user_name;
    document.getElementById('usr').innerHTML = '<i class="fas fa-user" style="margin-right: 8px;"></i>' + active_user_name + ' ';

    var check_user_id = todos.filter(u_id => {
        if(u_id.user_id == active_user_id)
        {
            return true;
        }
    })

    if(check_user_id.length)
    {
        localStorage.setItem('login_user_expenses', JSON.stringify(check_user_id));
        var active_user_list = JSON.parse(localStorage.getItem('login_user_expenses'));

        var main_tr = document.getElementById('main');
            main_tr.innerHTML = '';
        for(var i = 0; i < active_user_list.length; i++)
        {
            total_amount += parseInt(active_user_list[i].amount);
            var body_tr = document.createElement('tr');
            var serial_td = document.createElement('td');
                serial_td.innerHTML = i+1;
            body_tr.appendChild(serial_td);
            
            var exp_name_td = document.createElement('td');
                exp_name_td.setAttribute('style', 'text-transform:capitalize')
                exp_name_td.innerHTML = active_user_list[i].expense;
            body_tr.appendChild(exp_name_td);
            
            var amount_td = document.createElement('td');
                amount_td.innerHTML = active_user_list[i].amount;
            body_tr.appendChild(amount_td);
            
            var created_td = document.createElement('td');
                created_td.innerHTML = active_user_list[i].created_at;
            body_tr.appendChild(created_td);

            var action_td = document.createElement('td');
            var update_btn = document.createElement('button');
                update_btn.setAttribute('class', 'btn btn-dark btn-sm');
                update_btn.setAttribute('style', 'margin-right: 10px');
                update_btn.setAttribute('id', active_user_list[i].expense_id);
                update_btn.setAttribute('onclick', 'update(this)');
                update_btn.innerHTML = 'Update';
            action_td.appendChild(update_btn);

            var delete_btn = document.createElement('button');
                delete_btn.setAttribute('class', 'btn btn-danger btn-sm btn_margin');
                delete_btn.setAttribute('id', i)
                delete_btn.innerHTML = 'Delete';
                delete_btn.setAttribute('onclick', 'remove(this)');
                // delete_btn.setAttribute('id', active_user_list[i].expense_id);
                // delete_btn.setAttribute('onclick', 'remove(this)');
               
            action_td.appendChild(delete_btn);
            body_tr.appendChild(action_td);

            main_tr.appendChild(body_tr);   
        }
        document.getElementById('total').innerHTML = 'Total Amount: ' + total_amount;


        
        
    }

    
}

function reset()
{
    document.getElementById('exp_name').value  = '';
    document.getElementById('exp_amount').value = '';

    document.getElementById('add_btn').style = 'display:block';
    document.getElementById('upd_btn').style = 'display:none';
    document.getElementById('del_btn').style = 'display:none';

}



function sort()
{
    var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("filter_record");
            filter = input.value.toUpperCase();
            table = document.getElementById("table_record");
            tr = table.getElementsByTagName("tr");
    
            for (i = 0; i < tr.length; i++) {      
                td = tr[i].getElementsByTagName("td")[1];
                if(td) {
                    txtValue = td.textContent || td.innerText;
                    if(txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }  
            }
}





    


