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

    function displayNum(class_name, value, sign_type, is_decimal_point){

        let dollar = (sign_type == "dollar") ? "$" : "";  
        let percent = (sign_type == "percent") ? "%" : "";  

        if (class_name == "bp") {
            console.log(value.toLocaleString("en"));
        }
        
        if (is_decimal_point) {
            value.toFixed(2);
        }

        $("."+class_name).html(dollar+value.toLocaleString("en")+percent);

    }

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

        let od = com = pc = sc = barc = spbcc = bd = br = bci = rc = pparv = lf = pmd = ppsf = np = tnp = ppc =
            pp = ppr = pr = arv80 = bp = sfc = tle = ba = bcc = thc = allc = np80bp = lbearcltv = lbearncltv = lbearc =
            lbearnc = cop = arv70 = 0;
        
        if (sales_price_resale != 0) {

            if (cost_to_buy != 0) {

                //ORIGINAL DIFFERENCE
                od = sales_price_resale - cost_to_buy;
                displayNum("od", od, "dollar", false);

                if (down_payment != 0) {

                    //LOAN FUNDING - INACCURATE
                    lf = Math.abs(cost_to_buy * (1-down_payment));
                    displayNum("lf", lf, "dollar", false);

                    if (annual_interest != 0) {

                        //COST OF MONEY 1ST LIEN - INACCURATE
                        if (loan_points != 0 && hold_time != 0) {
                            com = ((cost_to_buy * (1-down_payment) * loan_points) - (((cost_to_buy*(1-down_payment))*annual_interest/hold_time)*hold_time));
                            displayNum("com", com, "dollar", false);
                        }

                        //PER MONTH $$ - INACCURATE
                        pmd = Math.abs((annual_interest * lf) / 12)
                        displayNum("pmd", pmd, "dollar", false);

                    }

                }

                //PURCHASE COST - INACCURATE
                pc = cost_to_buy *(-0.0055)+400;
                displayNum("pc", pc, "dollar", false);
                displayNum("purpri", pc, "dollar", false);

                //Purchase PRICE % of ARV & LOAN Amount % of ARV & Detailed Flip % of PP to ARV
                pparv = (cost_to_buy/sales_price_resale ) * 100;
                displayNum("pparv", pparv, "percent", true);
                displayNum("laarv", pparv, "percent", true);
                displayNum("dfarv", pparv, "percent", true);

            }

            //SALES COST - INACCURATE
            sc = sales_price_resale * -(0.0055)+400;
            displayNum("sc", sc, "dollar", false);

            // BUYER'S AGENT REALTOR COMMISSION /   Buyer's Agent
            barc = sales_price_resale * commission_sale;
            displayNum("barc", barc, "dollar", false);
            displayNum("ba", barc, "dollar", false);

            //SELLER PAID BUYER'S CLOSING COSTS /   Buyer's CC
            spbcc = (commission_sale / 100) * sales_price_resale;
            displayNum("spbcc", spbcc, "dollar", false);
            displayNum("bcc", spbcc, "dollar", false);


            //Price Per SF, ARV
            if (home_sf != 0) {
                ppsf = sales_price_resale / home_sf;
                displayNum("ppsf", ppsf, "dollar", true);
            }

            // ARV
            displayNum("arv", sales_price_resale, "dollar", false);

            // 80% of ARV
            arv80 = sales_price_resale * 0.8;
            displayNum("80arv", arv80, "dollar", false);

            //BUY PRICE / 80% Rule = this PP
            bp = arv80 + rc;
            displayNum("bp", bp, "dollar", false);
            displayNum("80pp", bp, "dollar", false);

        }

        //BORROWER DOWNPAYMENT
        bd = (down_payment / 100) * cost_to_buy;
        displayNum("bd", bd, "dollar", false);
        displayNum("dp", bd, "dollar", false);

        //BORROWER CASH IN
        bci = rc + bd;
        displayNum("bci", bci, "dollar", false);

        //REHAB COSTS & BORROWER REPAIR - INACCURATE
        if (home_sf != 0) {

            let input_cost_val = 0;
            let repair_selected = $('[name="level-repair"]').find(":selected").text();

            switch (repair_selected) {
                case "Basic":
                    input_cost_val = 35;
                    break;
                case "Medium":
                    input_cost_val = 50;
                    break;
                case "Everything":
                    input_cost_val = 80;
                    break;
                case "Other":
                    input_cost_val = $("[name='bid']").val();
                    break;
            }

            console.log(repair_selected);

            if (input_cost_val != null) {
                var rc = (repair_selected != "Other") ? Math.abs(-1 * home_sf * parseInt(input_cost_val)) : parseInt(input_cost_val);
                $.each(['rc','br','rehab','rmc'], function(index, value){
                    displayNum(value, rc, "dollar", false);
                });
            }
        }

        //NET PROFIT
        np = od + com + sc + barc + spbcc + rc;
        displayNum("np", np, "dollar", false);

        //TOTAL NET PROFIT
        tnp = np + ppc;
        displayNum("tnp", tnp, "dollar", false);

        //Profit as % of P.P.
        pp = np / cost_to_buy;
        displayNum("pp", pp, "percent", true);

        //Profit as % of P.P. & Rehab
        ppr = np / (cost_to_buy + np);
        displayNum("ppr", ppr, "percent", true);

        //Profit as % of Rehab
        pr = np / -rc;
        displayNum("pr", pr, "percent", true);

        //TOTAL HARD COST
        thc = cost_to_buy + rc;
        displayNum("thc", thc, "dollar", false);

        //SOFT COSTS
        sfc = com + spbcc + tle + barc;
        displayNum("sfc", sfc, "dollar", false);

        //TITLE
        tle = pc + sc;
        displayNum("tle", tle, "dollar", false);

        //ALL COSTS
        allc = thc + sfc;
        displayNum("allc", allc, "dollar", false);

        //Net Profit based on inputs above but with 80% rule "Buy Price" - INACCURATE
        let np80bp_sum = com + pc + sc + barc + spbcc;
        np80bp = ((sales_price_resale - bp ) + np80bp_sum + rc);
        displayNum("np80bp", np80bp, "dollar", false);

        //Lender Break Even - Assuming Rehab is Complete
        lbearc = lf + np80bp_sum;
        lbearcltv = lbearc / sales_price_resale;
        displayNum("lbearc", lbearc, "dollar", false);
        displayNum("lbearcltv", lbearcltv, "percent", true);

        //Lender Break Even - Assuming Rehab is NOT Complete
        lbearnc= lbearcltv + rc;
        lbearncltv = lbearnc + rc;
        displayNum("lbearnc", lbearnc, "dollar", false);
        displayNum("lbearncltv", lbearncltv, "percent", true);

        //Cash out of pocket
        cop = bd + rc;
        displayNum("cop", cop, "dollar", false);

        //70% of ARV Rule = this PP
        arv70 = sales_price_resale * 0.7;
        displayNum("70arvpp", arv70, "dollar", false);

    });

    
})