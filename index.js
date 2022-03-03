// For Calendar
let today = new Date();
let today_year = today.getFullYear();
let today_month = today.getMonth() + 1;
let today_date = today.getDate();

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

function move_page(YYYY, MM, DD) {
    location.href = 'add.html';
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
        document.write('<td class="')

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

        document.write('" style="cursor: pointer; ');
        if (YYYY == today_year && MM == today_month && DD == today_date) {
            if (day_of_week(YYYY, MM, DD) == 0) {
                document.write('color: red; font-weight: 900;');
            } else if (day_of_week(YYYY, MM, DD) == 6) {
                document.write('color: blue; font-weight: 900;');
            } else {
                document.write('color: black; font-weight: 900;');
            }
        } 

        document.write('" onclick="move_page(' + YYYY + ', ' + MM + ', ' + DD + ')">');
        document.write(DD + '</td>');

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
    const calendar = document.querySelector('#calendar');
    if (calendar) {
        calendar.remove();
    }

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
    const main = document.querySelector('main');
    const calendartitle = document.querySelector('#calendar_title');
    const yearmonth = document.querySelector('#year_month');
    const dayoftheweek = document.querySelector('.day_of_the_week');
    const calendar = document.querySelector('#calendar');
    const footer = document.querySelector('footer');

    let headerHeight = header.offsetHeight;
    let calendartitleHeight = calendartitle.offsetHeight;
    let dayoftheweekHeight = dayoftheweek.offsetHeight;
    let footerHeight = footer.offsetHeight;
    let middle = innerHeight - headerHeight - footerHeight
    let calendarHeight = innerHeight - headerHeight - calendartitleHeight - dayoftheweekHeight - footerHeight;

    header.style.width = innerWidth + 'px';
    main.style.width = innerWidth + 'px';
    main.style.height = middle + 'px';
    yearmonth.style.width = (innerWidth - 146) + 'px';

    for (var k = 0; k <= weeks_of_month(YYYY, MM); k++) {
        let tr = calendar.getElementsByTagName('tr')[k];
        for (var l = 0; l <= 6; l++) {
            let td = tr.getElementsByTagName('td')[l];
            td.style.width = (innerWidth - 6) / 7 + 'px';
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
