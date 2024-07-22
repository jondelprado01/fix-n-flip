$(document).ready(function(){
    
    // DARK / LIGHT MODE TOGGLE

    let current_theme = localStorage.getItem('theme');
    let theme_status = (current_theme == "light") ? false : true;

    if (theme_status == true) {
        $(".lb-card").toggleClass('light-blue');
        $(".lg-card").toggleClass('light-green');
        $(".lo-card").toggleClass('light-orange');
        $(".g-card, .g-table").toggleClass('grey');
        $(".y-tr").toggleClass('yellow');
    }

    $(".html-container").attr("data-theme", localStorage.getItem('theme'));
    $(".toggle-theme").prop("checked", theme_status);

    $(".toggle-theme").on("click", function(){
        
        if ($(this).is(":checked")) {
            localStorage.setItem('theme', 'dark');
            $("div, table, tr").removeClass('grey light-green light-blue light-orange yellow');
        }
        else{
            localStorage.setItem('theme', 'light');
            $(".lb-card").toggleClass('light-blue');
            $(".lg-card").toggleClass('light-green');
            $(".lo-card").toggleClass('light-orange');
            $(".g-card, .g-table").toggleClass('grey');
            $(".y-tr").toggleClass('yellow');
        }

        $(".html-container").attr("data-theme", localStorage.getItem('theme'));
    });

})