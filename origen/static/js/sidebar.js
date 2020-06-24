//[we added this] - This is collapse status variable for sidebar
var status = false;

//[we added this] - if first time session storage is null 
//just make status = false
//if it isnt the first time then make status = the saved session storage
if(sessionStorage.getItem("collapsevariable") === null){
    status = false;
} else{
    status = sessionStorage.getItem("collapsevariable");
}


// Hide submenus
$('#body-row .collapse').collapse('hide'); 

// Collapse/Expand icon
$('#collapse-icon').addClass('fa-angle-double-left');

//[we added this] - if any items of the sidebar is clicked while collapsed it will uncollapse
$('.sidebarclick').click(function() {
    console.log("hello");
    if(status === "true"){
        SidebarCollapse();
        status = false;
        sessionStorage.removeItem("collapsevariable");
        sessionStorage.setItem("collapsevariable", status);
        console.log("bye");
    }
});

// Collapse click
$('[data-toggle=sidebar-colapse]').click(function() {
    SidebarCollapse();
    console.log("roll");

    //[we added this] - if we click on a non-collapsed sidebar it is now 
    //collapsed and therefore we set collapse status for sidebar to true
    //we then saved the status to local storage so the status will be saved
    //when the page is refreshed
    //we used a sessionStorage.removeItem to clear old status
    if (status === "false"){
        status = true;
        console.log("status is " + status);
        sessionStorage.removeItem("collapsevariable");
        sessionStorage.setItem("collapsevariable", status);
    } 
    //[we added this] - if we click on a collapsed sidebar it is now 
    //non-collapsed and therefore we set collapse status for sidebar to false
    //we then saved the status to local storage so the status will be saved
    //when the page is refreshed
    //we used a sessionStorage.removeItem to clear old status
    else if (status === "true"){
        status = false;
        console.log(status);
        sessionStorage.removeItem("collapsevariable");
        sessionStorage.setItem("collapsevariable", status);
    }
});

//[we added this] - Using the saved collapse status from local storage it will 
//keep our page collapsed or non-collapse
var temp = sessionStorage.getItem("collapsevariable");
console.log("temp is " + temp);
if(temp === "true"){
    SidebarCollapse ();
}

function SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $('.sidebar-separator-title');
    if ( SeparatorTitle.hasClass('d-flex') ) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }
    
    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}






