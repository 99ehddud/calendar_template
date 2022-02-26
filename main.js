// For Calendar
let today = new Date();
let today_year = today.getFullYear();
let today_month = today.getMonth() + 1;
let today_date = today.getDate();
let today_hour = today.getHours();
let today_minute = today.getMinutes();

function finalday_of_Month(YYYY, MM) {
    return 32 - new Date(YYYY, MM - 1, 32).getDate();
}

function day_of_week(YYYY, MM, DD) {
    return new Date(YYYY, MM - 1, DD).getDay();
}

function weeks_of_month(YYYY, MM) {
    let days = day_of_week(YYYY, MM, 1) + finalday_of_Month(YYYY, MM);
    if (days/7 <= 4) {
        return 4;
    } else if (days/7 <= 5) {
        return 5;
    } else if (days/7 <= 6) {
        return 6;
    }
}

let isFirst = true;
let isSecond = false;
let isThird = false;

function initialize_turn() {
    isFirst = true;
    isSecond = false;
    isThird = false;
}

function input_null() {
    document.getElementById('start_year').value = null;
    document.getElementById('start_month').value = null;
    document.getElementById('start_day').value = null;
    document.getElementById('end_year').value = null;
    document.getElementById('end_month').value = null;
    document.getElementById('end_day').value = null;
}

function input_date(YYYY, MM, DD) {
    let start_year = document.getElementById('start_year').value;
    let start_month = document.getElementById('start_month').value;
    let start_day = document.getElementById('start_day').value;
    let end_year = document.getElementById('end_year').value;
    let end_month = document.getElementById('end_month').value;
    let end_day = document.getElementById('end_day').value;
    
    if (isFirst) {
        isFirst = false;
        document.getElementById('start_year').value = YYYY;
        document.getElementById('start_month').value = MM;
        document.getElementById('start_day').value = DD;
        document.getElementById('end_year').value = YYYY;
        document.getElementById('end_month').value = MM;
        document.getElementById('end_day').value = DD;
        isSecond = true;
    } else if (isSecond) {
        isSecond = false;
        if ((YYYY == start_year && MM == start_month && DD < start_day) || (YYYY == start_year && MM < start_month) || (YYYY < start_year)) {
            document.getElementById('start_year').value = YYYY;
            document.getElementById('start_month').value = MM;
            document.getElementById('start_day').value = DD;
            isThird = true;
        } else if (YYYY == start_year && MM == start_month && DD == start_day) {
            input_null();
            isFirst = true;
        }else if ((YYYY == end_year && MM == end_month && DD > end_day) || (YYYY == end_year && MM > end_month) || (YYYY > end_year)) {
            document.getElementById('end_year').value = YYYY;
            document.getElementById('end_month').value = MM;
            document.getElementById('end_day').value = DD;
            isThird = true;
        }
    } else if (isThird) {
        isThird = false;
        input_null()
        isFirst = true;
    } else {
        initialize_turn();
        input_null();
    }
}

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

function maxCheck(YYYY, MM, object) {
    if (YYYY && MM) {
        object.max = finalday_of_Month(YYYY, MM);
    }
}

function make_calendar(YYYY, MM) {
    let year_month = YYYY + '. ' + MM;
    document.getElementById('year_month').textContent = year_month;

    document.write('<table id=\'calendar\'>');

    const day_of_the_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    document.write('<tr>');
    for (var h = 0; h <= 6; h++) {
        document.write('<td class=\'day_of_the_week\'>' + day_of_the_week[h] + '</td>');
    }
    document.write('</tr>');

    if (day_of_week(YYYY, MM, 1) != 0) {
        document.write('<tr>');
        for (var i = 1; i <= day_of_week(YYYY, MM, 1); i++) {
            document.write('<td></td>')
        }
    }

    for (var DD = 1; DD <= finalday_of_Month(YYYY, MM); DD++) {
        if (day_of_week(YYYY, MM, DD) == 0) {
            document.write('<tr>');
        }
        document.write('<td class=\'')

        if (day_of_week(YYYY, MM, DD) == 0) {
            if (weeks_of_month(YYYY, MM) == 4) {
                document.write('sunday_4week');
            } else if (weeks_of_month(YYYY, MM) == 5) {
                document.write('sunday_5week');
            } else if (weeks_of_month(YYYY, MM) == 6) {
                document.write('sunday_6week');
            }
        } else if (day_of_week(YYYY, MM, DD) == 6) {
            if (weeks_of_month(YYYY, MM) == 4) {
                document.write('saturday_4week');
            } else if (weeks_of_month(YYYY, MM) == 5) {
                document.write('saturday_5week');
            } else if (weeks_of_month(YYYY, MM) == 6) {
                document.write('saturday_6week');
            }
        } else {
            if (weeks_of_month(YYYY, MM) == 4) {
                document.write('weekday_4week');
            } else if (weeks_of_month(YYYY, MM) == 5) {
                document.write('weekday_5week');
            } else if (weeks_of_month(YYYY, MM) == 6) {
                document.write('weekday_6week');
            }
        }

        document.write('\' onclick=\'input_date(' + YYYY + ', ' + MM + ', ' + DD + ')\' style="cursor: pointer; ');
        if (YYYY == today_year && MM == today_month && DD == today_date) {
            if (day_of_week(YYYY, MM, DD) == 0) {
                document.write('color: red; font-weight: 900;"">' + DD);
            } else if (day_of_week(YYYY, MM, DD) == 6) {
                document.write('color: blue; font-weight: 900;"">' + DD);
            } else {
                document.write('color: black; font-weight: 900;"">' + DD);
            }

        } else {
            document.write('">' + DD);
        }
        document.write('</td>');

        if (day_of_week(YYYY, MM, DD) != 6 && DD == finalday_of_Month(YYYY, MM, DD)) {
            for (var j = day_of_week(YYYY, MM, DD); j < 6; j++){
                document.write('<td></td>');
            }
        }

        if (day_of_week(YYYY, MM, DD) == 6) {
            document.write('</tr>');
        }
    }
    document.write('</table>');
}

// For Button
function next_month() {
    if (today_month < 12) {
        today_month += 1;
    } else {
        today_year += 1;
        today_month = 1;
    }
}

function prev_month() {
    if (today_month > 1) {
        today_month -= 1;
    } else {
        today_year -= 1;
        today_month = 12;
    }
}

// For Resize
function resize(YYYY, MM) {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    const header = document.querySelector('header');
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');
    const calendartitle = document.querySelector('#calendar_title');
    const yearmonth = document.querySelector('#year_month');
    const dayoftheweek = document.querySelector('.day_of_the_week');
    const calendar = document.querySelector('#calendar');
    const todo = document.querySelector('#to_do');
    const instruction = document.querySelector('#instruction');
    const footer = document.querySelector('footer');

    let headerHeight = header.offsetHeight;
    let asideWidth = aside.offsetWidth;
    let calendartitleHeight = calendartitle.offsetHeight;
    let dayoftheweekHeight = dayoftheweek.offsetHeight;
    let footerHeight = footer.offsetHeight;
    let middle = innerHeight - headerHeight - footerHeight
    let calendarHeight = innerHeight - headerHeight - calendartitleHeight - dayoftheweekHeight - footerHeight;

    header.style.width = innerWidth + 'px';
    main.style.width = (innerWidth - asideWidth) + 'px';
    main.style.height = middle + 'px';
    aside.style.height = middle + 'px';
    todo.style.height = middle/2 + 'px';
    todo.style.padding = ((middle/2 - 1) <= 250) ? '10px 0' : (middle/2 - 231)/2 + 'px 0';
    instruction.style.height = middle/2 + 'px';
    instruction.style.padding = ((middle / 2) <= 250) ? '10px 0' : (middle / 2 - 230) / 2 + 'px 0';
    yearmonth.style.width = (innerWidth - asideWidth - 146) + 'px';

    for (var k = 0; k <= weeks_of_month(YYYY, MM); k++) {
        let tr = calendar.getElementsByTagName('tr')[k];
        for (var l = 0; l <= 6; l++) {
            let td = tr.getElementsByTagName('td')[l];
            td.style.width = (innerWidth - asideWidth - 6) / 7 + 'px';
            if (k != 0) {
                td.style.height = calendarHeight / weeks_of_month(YYYY, MM) + 'px';
                td.style.borderTop = '1px solid rgb(180, 180, 180)';
            }

            if (l < 6) {
                td.style.borderRight = '1px solid rgb(180, 180, 180)';
            }
        }
    }
}
