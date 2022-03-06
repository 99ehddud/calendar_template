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

function make_calendar(YYYY, MM) {
    let year_month = YYYY + '.' + MM;
    document.getElementById('year_month').textContent = year_month;

    let week = weeks_of_month(YYYY, MM);
    let finalday = finalday_of_Month(YYYY, MM);

    let table = document.createElement('table');
    table.id = 'calendar';
    let tr, td;

    const day_of_the_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    tr = document.createElement('tr');
    for (let i = 0; i < day_of_the_week.length; i++) {
        td = document.createElement('td');
        td.innerHTML = day_of_the_week[i];
        td.className = 'day_of_the_week';
        tr.appendChild(td);
    }
    table.appendChild(tr);

    if (day_of_week(YYYY, MM, 1) != 0) {
        tr = document.createElement('tr');
        for (let i = 0; i < day_of_week(YYYY, MM, 1); i++) {
            td = document.createElement('td');
            tr.appendChild(td);
        }
    }

    for (let DD = 1; DD <= finalday; DD++) {
        if (day_of_week(YYYY, MM, DD) == 0) {
            tr = document.createElement('tr');
        }

        td = document.createElement('td');
        td.innerHTML = DD;

        if (day_of_week(YYYY, MM, DD) == 0) {
            td.className = 'sunday_' + week + 'week';
        } else if (day_of_week(YYYY, MM, DD) == 6) {
            td.className = 'saturday_' + week + 'week';
        } else {
            td.className = 'weekday_' + week + 'week';
        }
        td.style.cursor = 'pointer';

        
        if (YYYY == today.getFullYear() && MM == today.getMonth()+1 && DD == today.getDate()) {
            td.id = 'today';
        }

        tr.appendChild(td);

        if (day_of_week(YYYY, MM, DD) == 6) {
            table.appendChild(tr);
        }
    }

    if (day_of_week(YYYY, MM, finalday) != 6) {
        for (let i = day_of_week(YYYY, MM, finalday); i < 6; i++) {
            td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    table.appendChild(tr);
    
    calendar_location.appendChild(table);
    resize(today_year, today_month);
}

// For Making Calendar by "document.write()"
// function make_calendar(YYYY, MM) {
//     let year_month = YYYY + '. ' + MM;
//     document.getElementById('year_month').textContent = year_month;

//     document.write('<table id=\'calendar\'>');

//     const day_of_the_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     document.write('<tr>');
//     for (var h = 0; h <= 6; h++) {
//         document.write('<td class=\'day_of_the_week\'>' + day_of_the_week[h] + '</td>');
//     }
//     document.write('</tr>');

//     if (day_of_week(YYYY, MM, 1) != 0) {
//         document.write('<tr>');
//         for (var i = 1; i <= day_of_week(YYYY, MM, 1); i++) {
//             document.write('<td></td>')
//         }
//     }

//     for (var DD = 1; DD <= finalday_of_Month(YYYY, MM); DD++) {
//         if (day_of_week(YYYY, MM, DD) == 0) {
//             document.write('<tr>');
//         }
//         document.write('<td class="')

//         if (day_of_week(YYYY, MM, DD) == 0) {
//             if (weeks_of_month(YYYY, MM) == 4) {
//                 document.write('sunday_4week');
//             } else if (weeks_of_month(YYYY, MM) == 5) {
//                 document.write('sunday_5week');
//             } else if (weeks_of_month(YYYY, MM) == 6) {
//                 document.write('sunday_6week');
//             }
//         } else if (day_of_week(YYYY, MM, DD) == 6) {
//             if (weeks_of_month(YYYY, MM) == 4) {
//                 document.write('saturday_4week');
//             } else if (weeks_of_month(YYYY, MM) == 5) {
//                 document.write('saturday_5week');
//             } else if (weeks_of_month(YYYY, MM) == 6) {
//                 document.write('saturday_6week');
//             }
//         } else {
//             if (weeks_of_month(YYYY, MM) == 4) {
//                 document.write('weekday_4week');
//             } else if (weeks_of_month(YYYY, MM) == 5) {
//                 document.write('weekday_5week');
//             } else if (weeks_of_month(YYYY, MM) == 6) {
//                 document.write('weekday_6week');
//             }
//         }

//         document.write('" style="cursor: pointer; ');
//         if (YYYY == today_year && MM == today_month && DD == today_date) {
//             if (day_of_week(YYYY, MM, DD) == 0) {
//                 document.write('color: red; font-weight: 900;');
//             } else if (day_of_week(YYYY, MM, DD) == 6) {
//                 document.write('color: blue; font-weight: 900;');
//             } else {
//                 document.write('color: black; font-weight: 900;');
//             }
//         } 

//         document.write('" onclick="move_page(' + YYYY + ', ' + MM + ', ' + DD + ')">');
//         document.write(DD + '</td>');

//         if (day_of_week(YYYY, MM, DD) != 6 && DD == finalday_of_Month(YYYY, MM, DD)) {
//             for (var j = day_of_week(YYYY, MM, DD); j < 6; j++){
//                 document.write('<td></td>');
//             }
//         }

//         if (day_of_week(YYYY, MM, DD) == 6) {
//             document.write('</tr>');
//         }
//     }
//     document.write('</table>');
// }

// For Button
function next_month() {
    const calendar = document.querySelector('#calendar');
    if (calendar) {
        calendar.remove();
    }

    if (today_month < 12) {
        today_month += 1;
    } else {
        today_year += 1;
        today_month = 1;
    }
    calendar_location.appendChild(make_calendar(today_year, today_month));
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
    calendar_location.appendChild(make_calendar(today_year, today_month));
}

let ishidden = true;
function show_schedule() {
    if (ishidden) {
        document.getElementById('schedule').style.opacity = 1;
        document.getElementById('schedule').style.visibility = "visible";
        ishidden = false;
    }
}

function hide_schedule() {
    if (!ishidden) {
        document.getElementById('schedule').style.opacity = 0;
        document.getElementById('schedule').style.visibility = "hidden";
        ishidden = true;
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

    let headerHeight = 60;
    let calendartitleHeight = calendartitle.offsetHeight;
    let dayoftheweekHeight = dayoftheweek.offsetHeight;
    let footerHeight = 40;
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
