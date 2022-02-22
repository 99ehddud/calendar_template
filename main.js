// For Calendar
let today = new Date();
let today_year = today.getFullYear();
let today_month = today.getMonth() + 1;
let today_date = today.getDate();

function finalday_of_Month(yyyy, MM) {
    return 32 - new Date(yyyy, MM - 1, 32).getDate();
}

function day_of_week(yyyy, MM, dd) {
    return new Date(yyyy, MM - 1, dd).getDay();
}

function weeks_of_month(yyyy, MM) {
    let days = day_of_week(yyyy, MM, 1) + finalday_of_Month(yyyy, MM);
    if (days/7 <= 4) {
        return 4;
    } else if (days/7 <= 5) {
        return 5;
    } else if (days/7 <= 6) {
        return 6;
    }
}

function make_calendar(yyyy, MM) {
    let year_month = yyyy + '. ' + MM;
    document.getElementById('year_month').textContent = year_month;

    document.write('<table id=\'calendar\'>');

    const day_of_the_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    document.write('<tr>');
    for (var h = 0; h <= 6; h++) {
        document.write('<td class=\'day_of_the_week\'>' + day_of_the_week[h] + '</td>');
    }
    document.write('</tr>');

    if (day_of_week(yyyy, MM, 1) != 0) {
        document.write('<tr>');
        for (var i = 1; i <= day_of_week(yyyy, MM, 1); i++) {
            document.write('<td></td>')
        }
    }

    for (var dd = 1; dd <= finalday_of_Month(yyyy, MM); dd++) {
        if (day_of_week(yyyy, MM, dd) == 0) {
            document.write('<tr>');
        }
        document.write('<td class=\'')

        if (day_of_week(yyyy, MM, dd) == 0) {
            if (weeks_of_month(yyyy, MM) == 4) {
                document.write('sunday_4week');
            } else if (weeks_of_month(yyyy, MM) == 5) {
                document.write('sunday_5week');
            } else if (weeks_of_month(yyyy, MM) == 6) {
                document.write('sunday_6week');
            }
        } else if (day_of_week(yyyy, MM, dd) == 6) {
            if (weeks_of_month(yyyy, MM) == 4) {
                document.write('saturday_4week');
            } else if (weeks_of_month(yyyy, MM) == 5) {
                document.write('saturday_5week');
            } else if (weeks_of_month(yyyy, MM) == 6) {
                document.write('saturday_6week');
            }
        } else {
            if (weeks_of_month(yyyy, MM) == 4) {
                document.write('weekday_4week');
            } else if (weeks_of_month(yyyy, MM) == 5) {
                document.write('weekday_5week');
            } else if (weeks_of_month(yyyy, MM) == 6) {
                document.write('weekday_6week');
            }
        }

        document.write('\'>');
        if (yyyy == today_year && MM == today_month && dd == today_date) {
            if (day_of_week(yyyy, MM, dd) == 0) {
                document.write('<span style=\'color: red; font-weight: 900;\'>' + dd + '</span>');
            } else if (day_of_week(yyyy, MM, dd) == 6) {
                document.write('<span style=\'color: blue; font-weight: 900;\'>' + dd + '</span>');
            } else {
                document.write('<span style=\'color: black; font-weight: 900;\'>' + dd + '</span>');
            }

        } else {
            document.write(dd);
        }
        document.write('</td>');

        if (day_of_week(yyyy, MM, dd) != 6 && dd == finalday_of_Month(yyyy, MM, dd)) {
            for (var j = day_of_week(yyyy, MM, dd); j < 6; j++){
                document.write('<td></td>');
            }
        }

        if (day_of_week(yyyy, MM, dd) == 6) {
            document.write('</tr>');
        }
    }
    document.write('</table>');
}

// For Button
function next_month() {
    
}

// For Resize
function resize(yyyy, MM) {
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
    const tmp = document.querySelector('#tmp');
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
    tmp.style.height = middle/2 + 'px';
    yearmonth.style.width = (innerWidth - asideWidth - 146) + 'px';

    for (var k = 0; k <= weeks_of_month(yyyy, MM); k++) {
        let tr = calendar.getElementsByTagName('tr')[k];
        for (var l = 0; l <= 6; l++) {
            let td = tr.getElementsByTagName('td')[l];
            td.style.width = (innerWidth - asideWidth - 6) / 7 + 'px';
            if (k != 0) {
                td.style.height = calendarHeight / weeks_of_month(yyyy, MM) + 'px';
                td.style.borderTop = '1px solid rgb(180, 180, 180)';
            }

            if (l < 6) {
                td.style.borderRight = '1px solid rgb(180, 180, 180)';
            }
        }
    }
}
