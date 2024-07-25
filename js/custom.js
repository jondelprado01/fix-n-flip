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

        let od = com = pc = sc = barc = spbcc = bd = br = bci = rc = pparv = lf = pmd = ppsf = np = tnp = ppc =
            pp = ppr = pr = arv80 = bp = sfc = tle = ba = bcc = thc = allc = np80bp = lbearcltv = lbearncltv = lbearc =
            lbearnc = cop = arv70 = 0;
        
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
                pc = cost_to_buy *(-0.0055)+400;
                $(".pc").html("$"+pc);
                $(".purpri").html("$"+pc);

                //Purchase PRICE % of ARV & LOAN Amount % of ARV & Detailed Flip % of PP to ARV
                pparv = (cost_to_buy/sales_price_resale ) * 100;
                $(".pparv").html(pparv.toFixed(2)+"%");
                $(".laarv").html(pparv.toFixed(2)+"%");
                $(".dfarv").html(pparv.toFixed(2)+"%");

            }

            //SALES COST - INACCURATE
            sc = sales_price_resale * -(0.0055)+400;
            $(".sc").html("$"+sc);

            // BUYER'S AGENT REALTOR COMMISSION /   Buyer's Agent
            barc = sales_price_resale * commission_sale;
            $(".barc").html("$"+barc);
            $(".ba").html("$"+barc);

            //SELLER PAID BUYER'S CLOSING COSTS /   Buyer's CC
            spbcc = (commission_sale / 100) * sales_price_resale;
            $(".spbcc").html("$"+spbcc);
            $(".bcc").html("$"+spbcc);


            //Price Per SF, ARV
            if (home_sf != 0) {
                ppsf = sales_price_resale / home_sf;
                $(".ppsf").html("$"+ppsf.toFixed(2));
            }

            // ARV
            $(".arv").html("$"+sales_price_resale);

            // 80% of ARV
            arv80 = sales_price_resale * 0.8;
            $(".80arv").html("$"+arv80);

            //BUY PRICE / 80% Rule = this PP
            bp = arv80 + rc;
            $(".bp").html("$"+bp);
            $(".80pp").html("$"+bp);

        }

        //BORROWER DOWNPAYMENT
        bd = (down_payment / 100) * cost_to_buy;
        $(".bd").html("$"+bd);
        $(".dp").html("$"+bd);

        //BORROWER CASH IN
        bci = rc + bd;
        $(".bci").html("$"+bci);

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
                $(".rc").html("$"+rc);
                $(".br").html("$"+rc);
                $(".rehab").html("$"+rc);
                $(".rmc").html("$"+rc);
            }
        }

        //NET PROFIT
        np = od + com + sc + barc + spbcc + rc;
        $(".np").html("$"+np);

        //TOTAL NET PROFIT
        tnp = np + ppc;
        $(".tnp").html("$"+tnp);

        //Profit as % of P.P.
        pp = np / cost_to_buy;
        $(".pp").html(pp.toFixed(2)+"%");

        //Profit as % of P.P. & Rehab
        ppr = np / (cost_to_buy + np);
        console.log(ppr.toFixed(2));
        $(".ppr").html(ppr.toFixed(2)+"%");

        //Profit as % of Rehab
        pr = np / -rc;
        $(".pr").html(pr.toFixed(2)+"%");

        //TOTAL HARD COST
        thc = cost_to_buy + rc;
        $(".thc").html("$"+thc);

        //SOFT COSTS
        sfc = com + spbcc + tle + barc;
        $(".sfc").html("$"+sfc);

        //TITLE
        tle = pc + sc;
        $(".tle").html("$"+tle);

        //ALL COSTS
        allc = thc + sfc;
        $(".allc").html("$"+allc);

        //Net Profit based on inputs above but with 80% rule "Buy Price" - INACCURATE
        let np80bp_sum = com + pc + sc + barc + spbcc;
        np80bp = ((sales_price_resale - bp ) + np80bp_sum + rc);
        $(".np80bp").html("$"+np80bp);

        //Lender Break Even - Assuming Rehab is Complete
        lbearc = lf + np80bp_sum;
        lbearcltv = lbearc / sales_price_resale;
        $(".lbearc").html("$"+lbearc);
        $(".lbearcltv").html(lbearcltv.toFixed(2)+"%");

        //Lender Break Even - Assuming Rehab is NOT Complete
        lbearnc= lbearcltv + rc;
        lbearncltv = lbearnc + rc;
        $(".lbearnc").html("$"+lbearnc);
        $(".lbearncltv").html(lbearncltv.toFixed(2)+"%");

        //Cash out of pocket
        cop = bd + rc;
        $(".cop").html("$"+cop);

        //70% of ARV Rule = this PP
        arv70 = sales_price_resale * 0.7;
        $(".70arvpp").html("$"+arv70);

    });

    
})