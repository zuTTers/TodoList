
	var todoContainer = { maxId: 1, todoItems: [] };
	var task = $('#txtTask').val();

    if (localStorage.getItem("todoContainer") != null) {
    todoContainer = JSON.parse(localStorage.getItem("todoContainer"));
    }
	
	$('#txtTask').keypress(function (e) {
        var code = e.which | e.keyCode;
        task = $('#txtTask').val();

        if (code == 13) {
            PutIntoArray();
        }
        
    });
	
	$('#btnAllDelete').click(function () {
        for (var i = 0; i < todoContainer.todoItems.length; i++) {
            if (todoContainer.todoItems[i].state == 2) {
                todoContainer.todoItems.splice(i, 1);                
                localStorage.setItem("todoContainer", JSON.stringify(todoContainer));               
            }           
        }
		ListToDoItems();
    });
	
	
    	
	$('#btnAdd').click(function () {
		$('#lstTasks').css({"padding-bottom": "10px","display": "none" ,"color":"blue"});
		$('#lstTasks').slideDown("slow");
        PutIntoArray();
    });

	$('#btnActive').click(function(){
		$('#lstTasks').empty();
		var orderList = getOrderedToDoItemsContainer();
		for (var i = 0; i < orderList.length ; i++) 
		{
			if (orderList[i].todo != "") {
				if (orderList[i].state == 1) {
                    $('#lstTasks').append('<li id="lstItemTask" class="mylistitemsekil">' + orderList[i].todo + '<div style="float:right;"><a id="btnTamamlandi" onclick="UpdateStatus(' + orderList[i].id + ')"> <span class="fa-2x fa fa-plus"></span></a>' + '<a id="btnSil" onclick="DeleteToDoItem(' + orderList[i].id + ')"> <span class="fa-2x fa fa-close"></span></a></div></li>');
				}
			}
		
		}	
	});
	
	$('#btnComplated').click(function(){
		$('#lstTasks').empty();
		var orderList = getOrderedToDoItemsContainer();
		for (var i = 0; i < orderList.length ; i++) 
		{
			if (orderList[i].todo != "") {
				if (orderList[i].state == 2) {
                    $('#lstTasks').append('<li id="lstItemTask" class="mylistitemsekil" style="text-decoration: line-through;">' + orderList[i].todo + '<div style="float:right;"><a id="btnTamamlandi" onclick="UpdateStatus(' + orderList[i].id + ')"> <span class="fa-2x fa fa-minus"></span></a>' + '<a id="btnSil" onclick="DeleteToDoItem(' + orderList[i].id + ')"> <span class="fa-2x fa fa-close"></span></a></div></li>');
				}
			}		
		}	
	});
	
	$('#btnAll').click(function(){
		
		ListToDoItems();		
	});
		
    function ListToDoItems() {
        $('#lstTasks').empty();
        var orderList = getOrderedToDoItemsContainer();
        
        for (var i = 0; i < orderList.length ; i++) {
            if (orderList[i].todo != "") {
                if (orderList[i].state == 1) {
                    $('#lstTasks').append('<li id="lstItemTask" class="mylistitemsekil">' + orderList[i].todo + '<div style="float:right;"><a id="btnTamamlandi" onclick="UpdateStatus(' + orderList[i].id + ')"> <span class="fa-2x fa fa-plus"></span></a>' + '<a id="btnSil" onclick="DeleteToDoItem(' + orderList[i].id + ')"> <span class="fa-2x fa fa-close"></span></a></div></li>');
                }
                else if (orderList[i].state == 2)
                    $('#lstTasks').append('<li id="lstItemTask" class="mylistitemsekil" style="text-decoration: line-through;">' + orderList[i].todo + '<div style="float:right;"><a id="btnTamamlandi" onclick="UpdateStatus(' + orderList[i].id + ')"> <span class="fa-2x fa fa-minus"></span></a>' + '<a id="btnSil" onclick="DeleteToDoItem(' + orderList[i].id + ')"> <span class="fa-2x fa fa-close"></span></a></div></li>');
            }
            
        }
    }

    function PutIntoArray() {
		
        task = $('#txtTask').val();
        if (task != "") {
            todoContainer.todoItems.push({ id: guid(), todo: task, state: 1, createdDate: Date() });
            localStorage.setItem("todoContainer", JSON.stringify(todoContainer));
            ListToDoItems();
        }
        $('#txtTask').val("");
		$('#txtTask').focus();
    }
   
    function getOrderedToDoItemsContainer() {
        if (todoContainer.todoItems.length > 0) {
            var tempItems = JSON.parse(JSON.stringify(todoContainer.todoItems));
            var orderedItems = [];
          
            for (var x = 0; tempItems.length > 1; x++) {  

                var enb = tempItems[0].id;
                var index = 0;
                for (var y = 1; y < tempItems.length; y++) {
                    if (enb < tempItems[y].id) {
                        enb = tempItems[y].id;
                        index = y;
                    }
                        
                }
                orderedItems.push(tempItems[index]);
                tempItems.splice(index, 1);

                
            }
            orderedItems.push(tempItems[0]);
            var orderedItems2 = [];
            for (var x = 0; x< orderedItems.length; x++) {
                if (orderedItems[x].state == 1) {
                    orderedItems2.push(orderedItems[x]);
                }
            }
            for (var x = 0; x <  orderedItems.length; x++) {
                if (orderedItems[x].state == 2) {
                    orderedItems2.push(orderedItems[x]);
                }
            }
         
            return orderedItems2;
        }
        else {
            return [];
        }

    }

    function guid() {
        var now = new Date();
        var ticks = now.getTime();       
        return ticks;
    }

    function DeleteToDoItem(id) {
        for (var i = 0; i < todoContainer.todoItems.length; i++) {
            if (todoContainer.todoItems[i].id == id) {
                todoContainer.todoItems.splice(i, 1);
                ListToDoItems();
                localStorage.setItem("todoContainer", JSON.stringify(todoContainer));
                return;
            }           
        }
    }
	
	function UpdateStatus(id) {
		for (var i = 0; i < todoContainer.todoItems.length; i++) {
			if (todoContainer.todoItems[i].id == id) {
				if (todoContainer.todoItems[i].state==1) {
					todoContainer.todoItems[i].state = 2;
				}
				else {
					todoContainer.todoItems[i].state = 1;
				}
				
				ListToDoItems();
				localStorage.setItem("todoContainer", JSON.stringify(todoContainer));
				return;
			}
		}
	}
	
	ListToDoItems();




