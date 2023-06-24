/* 
File: main.js
GUI Assignment: Update the dynamic multiplication table to use JQuery Validation plug-in
Jayendra Rathore, Jayendra_Rathore@student.uml.edu 
Date Created: June 21, 2023
Description: This is the js for the multiplcation table, it has the JQuery code that uses the tabs plug-in
*/


// after document is ready I can 
$(document).ready(function() {
    // added method called "greater than or equal to" to compare the lower bound of the x axis or y axis
    $.validator.addMethod("greaterTOET", function (value, element, param) {
        let $lowerBound = $(param);
        if (this.settings.onfocusout) {
            $lowerBound.off(".validate-greaterTOET").on("blur.validate-greaterTOET", function() {
                $(element).valid();
            });
        }
        return parseInt(value) >= parseInt($lowerBound.val());
    }, "Max must be greater than min");
    

    $('#myForm').validate({
        rules: {
            xStart: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50] // sets range from -50 to 50, it's inclusive  
            },
            xEnd: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50], // sets range from -50 to 50, it's inclusive 
                greaterTOET: '#xStart'
            },
            yStart: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50] // sets range from -50 to 50, it's inclusive 
            },
            yEnd: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50], // sets range from -50 to 50, it's inclusive 
                greaterTOET: '#yStart'
            }
        },
        messages: {
            // messages for each wrong input based on the rules above
            xStart: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50" 
            },
            xEnd: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50",
                greaterTOET: "MUST be larger than or equal the horizontal start val"
            },
            yStart: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50"
            },
            yEnd: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50",
                greaterTOET: "MUST be larger than or equal the vertical start val"
            }
        }
    });
    
    
});

// function that checks if the form is valid
$(document).ready(function () {

    goStart();
    
});

function goStart() {
    initalSetUp();

    $("#xStart, #xEnd, #yStart, #yEnd").on("input", function() {
        // checks if all input fields are valid
        let isValid = $('#xStart').valid() && $('#xEnd').valid() && $('#yStart').valid() && $('#yEnd').valid();
        if (isValid) {
            console.log($('#xStart').valid() + ' ' + $('#xEnd').valid() + ' ' + $('#yStart').valid() + ' ' + $('#yEnd').valid());
            createTable();
        } else {
            $('#multTable').empty();    
        }
    });
}



function initalSetUp() {
    let isValid = $('#xStart').valid() && $('#xEnd').valid() && $('#yStart').valid() && $('#yEnd').valid();
    let xSVal = $('#xStart').val();
    let xEVal = $('#xEnd').val();
    let ySVal = $('#yStart').val();
    let yEVal = $('#yEnd').val();

    if (isValid && xSVal && xEVal && ySVal && yEVal) {
        createTable();
    } else {
        $('multTable').empty();
    }
}


// function called to create a table if the input fields are valids
function createTable() {

    // sets variables to the integer values of the input fields
    let xStartVal = parseInt($('#xStart').val());
    let xEndVal = parseInt($('#xEnd').val());
    let yStartVal = parseInt($('#yStart').val());
    let yEndVal = parseInt($('#yEnd').val());

    $("#xStart_slider").slider({
        min: -50,
        max: 50,
        value: xStartVal,
        step: 1,
        slide: function(event, ui) {
            $('#xStart').val(ui.value);
            goStart();
        }
    })
    
    $("#xEnd_slider").slider({
        min: -50,
        max: 50,
        value: xEndVal,
        step: 1,
        slide: function(event, ui) {
            $('#xEnd').val(ui.value);
            goStart();
        }
    })

    $("#yStart_slider").slider({
        min: -50,
        max: 50,
        value: yStartVal,
        step: 1,
        slide: function(event, ui) {
            $('#yStart').val(ui.value);
            goStart();
        }
    })

    $("#yEnd_slider").slider({
        min: -50,
        max: 50,
        value: yEndVal,
        step: 1,
        slide: function(event, ui) {
            $('#yEnd').val(ui.value);
            goStart();
        }
    })

    xStartVal = parseInt($('#xStart').val());
    xEndVal = parseInt($('#xEnd').val());
    yStartVal = parseInt($('#yStart').val());
    yEndVal = parseInt($('#yEnd').val());

    // empties the table so if the button is pressed again the previous table is no longer shown
    $('#multTable').empty();

    // sets amount of columns and rows I need, also I add 2 to be inclusive of the start and end vals
    let cols = xEndVal - xStartVal + 2;
    let rows = yEndVal - yStartVal + 2;

    // arrays for the x values and y values, both first start with start values
    const xArr = [xStartVal];
    const yArr = [yStartVal];

    // populates arrays
    for (let i = xStartVal + 1; i <= xEndVal; i++) {
        xArr.push(i);
    }
    for (let i = yStartVal + 1; i <= yEndVal; i++) {
        yArr.push(i);
    }

    const table = $('#multTable');
    for (let i = 0; i < rows; i++) {
        const row = $('<tr></tr>'); // adds table row variable
        for (let j = 0; j < cols; j++) {
            let tElement = 0;

            if (i === 0 && j === 0) {
                tElement = ''; // if it's the very first element the content will be blank (top left of table)
            } else if (j === 0) {
                tElement = yArr[i - 1];  // puts down values of first row
            } else if (i === 0) {
                tElement = xArr[j - 1];  // puts down values of the first column
            } else {
                tElement = xArr[j - 1] * yArr[i - 1];  // puts down values of products
            }

            row.append($('<td></tr>').text(tElement));
        }
        table.append(row);
    }
}

$(document).ready(function() {
    
    $('#myForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        createTab();
    });

});

function createTab() {
    console.log('success');
    let numTabs = $('#tabs ul li').length;
    // shows error message if there are more then 10 tabs
    if (numTabs >= 10) {
        let errMsg = $('.errMsg');
        errMsg.html('You may NOT exceed 10 tabs!!!');
        setTimeout(function() {
            errMsg.fadeOut('slow');
        }, 3000);
        return;
    }

    let isValid = $('#xStart').valid() && $('#xEnd').valid() && $('#yStart').valid() && $('#yEnd').valid();
    if (isValid) {
        let tabId = 'tab-' + (numTabs + 1);
        let tabLabel = 'Table ' + (numTabs + 1);
        let tableClone = $('#multTable').clone().removeAttr('id');

        // create a new tab
        $('#tabs ul').append('<li><a href="#' + tabId + '">' + tabLabel + '</a></li>');

        // create the tab content div and add the table
        $('#tabs').append('<div id="' + tabId + '" class="tab-content"></div>');
        $('#tabs').append('<br>');
        $('#' + tabId).append(tableClone);

        // initialize tabs
        $('#tabs').tabs();
        $('#tabs').tabs('refresh');
        $('#tabs').tabs('option', 'active', numTabs);
        
    } else {
        // create error message if the rules are not followd
        let errMsg = $('.errMsg');
        errMsg.html('Please follow the rules');
        setTimeout(function() {
            errMsg.fadeOut('slow');
        }, 3000);
        console.log('here');
        return;
    }
}
