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

    
    //CALCULATIONS

    var sales_price_resale = cost_to_buy = level_repair = bid = annual_interest = loan_points = down_payment = 
        hold_time = commission_sale = buyer_cc = home_sf = rent = pmt_loan = 0;

    $(".input-fields").on("input", function(){

        let input_value = $(this).val();
        let input_name = $(this).attr("name");

        switch (input_name) {
            case "sales-price-resale":
                sales_price_resale = input_value;
                break;
            case "cost-to-buy":
                cost_to_buy = input_value;
                break;
            case "level-repair":
                level_repair = input_value;
                break;
            case "bid":
                bid = input_value;
                break;
            case "annual-interest":
                annual_interest = input_value;
                break;
            case "loan-points":
                loan_points = input_value;
                break;
            case "down-payment":
                down_payment = input_value;
                break;
            case "hold-time":
                hold_time = input_value;
                break;
            case "commission-sale":
                commission_sale = input_value;
                break;
            case "buyer-cc":
                buyer_cc = input_value;
                break;
            case "home-sf":
                home_sf = input_value;
                break;
            case "rent":
                rent = input_value;
                break;
            default:
                pmt_loan = input_value;
                break;
        }

        let od = com = pc = sc = barc = spbcc = bd = br = bci = rc = pparv = lf = pmd = 0;

        if (sales_price_resale != 0) {

            if (cost_to_buy != 0) {

                //ORIGINAL DIFFERENCE
                od = sales_price_resale - cost_to_buy;
                $(".od").html("$"+od);

                if (down_payment != 0) {

                    //LOAN FUNDING - INACCURATE
                    lf = Math.abs(cost_to_buy * (1-down_payment));
                    $(".lf").html("$"+lf);

                    if (annual_interest != 0) {

                        //COST OF MONEY 1ST LIEN - INACCURATE
                        if (loan_points != 0 && hold_time != 0) {
                            com = ((cost_to_buy * (1-down_payment) * loan_points) - (((cost_to_buy*(1-down_payment))*annual_interest/hold_time)*hold_time));
                            $(".com").html("$"+com);
                        }

                        //PER MONTH $$ - INACCURATE
                        pmd = Math.abs((annual_interest * lf) / 12)
                        $(".pmd").html("$"+pmd);

                    }

                }

                //PURCHASE COST - INACCURATE
                if (cost_to_buy != 0) {
                    pc = cost_to_buy *(-0.0055)+400;
                    $(".pc").html("$"+pc);
                }

                //Purchase PRICE % of ARV & LOAN Amount % of ARV
                pparv = (cost_to_buy/sales_price_resale ) * 100;
                $(".pparv").html(pparv.toFixed(2)+"%");
                $(".laarv").html(pparv.toFixed(2)+"%");
            }

            //SALES COST - INACCURATE
            sc = sales_price_resale * -(0.0055)+400;
            $(".sc").html("$"+sc);

            // BUYER'S AGENT REALTOR COMMISSION
            barc = sales_price_resale * commission_sale;
            $(".barc").html("$"+barc);

            //SELLER PAID BUYER'S CLOSING COSTS
            spbcc = (commission_sale / 100) * sales_price_resale;
            $(".spbcc").html("$"+spbcc);

        }

        //BORROWER DOWNPAYMENT
        bd = (down_payment / 100) * cost_to_buy;
        $(".bd").html("$"+bd);

        //BORROWER CASH IN
        bci = rc + bd;
        $(".bci").html("$"+bci);

        //REHAB COSTS & BORROWER REPAIR - INACCURATE
        if (home_sf != 0) {
            let input_cost_val = $("[name='level-repair']").find(":selected").attr("cost-value");
            if (input_cost_val != null) {
                var rc = Math.abs(-1 * home_sf * parseInt(input_cost_val));
                $(".rc").html("$"+rc);
                $(".br").html("$"+rc);
            }
        }

    });

    
})