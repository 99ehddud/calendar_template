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
    document.write("<table>");

    let year_month = yyyy + ". " + MM;
    document.getElementById('year_month').textContent = year_month;

    let day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    document.write("<tr>");
    for (var i = 0; i <= 6; i++) {
        document.write("<td class=\"day_of_the_week\">" + day[i] + "</td>");
    }
    document.write("</tr>");

    document.write("<tr>");
    if (day_of_week(yyyy, MM, 1) != 0) {
        for (var j = 1; j <= day_of_week(yyyy, MM, 1); j++) {
            document.write("<td></td>")
        }
    }

    for (var dd = 1; dd <= finalday_of_Month(yyyy, MM); dd++) {
        if (day_of_week(yyyy, MM, dd) == 0) {
            document.write("<tr>");
        }
        document.write("<td class=\"")

        if (day_of_week(yyyy, MM, dd) == 0) {
            if (weeks_of_month(yyyy, MM) == 4) {
                document.write("sunday_4week");
            } else if (weeks_of_month(yyyy, MM) == 5) {
                document.write("sunday_5week");
            } else if (weeks_of_month(yyyy, MM) == 6) {
                document.write("sunday_6week");
            }
        } else if (day_of_week(yyyy, MM, dd) == 6) {
            if (weeks_of_month(yyyy, MM) == 4) {
                document.write("saturday_4week");
            } else if (weeks_of_month(yyyy, MM) == 5) {
                document.write("saturday_5week");
            } else if (weeks_of_month(yyyy, MM) == 6) {
                document.write("saturday_6week");
            }
        } else {
            if (weeks_of_month(yyyy, MM) == 4) {
                document.write("weekday_4week");
            } else if (weeks_of_month(yyyy, MM) == 5) {
                document.write("weekday_5week");
            } else if (weeks_of_month(yyyy, MM) == 6) {
                document.write("weekday_6week");
            }
        }

        document.write("\">");
        if (dd == today_date) {
            if (day_of_week(yyyy, MM, dd) == 0) {
                document.write("<span style=\"color: red; font-weight: 900;\">" + dd + "</span>");
            } else if (day_of_week(yyyy, MM, dd) == 6) {
                document.write("<span style=\"color: blue; font-weight: 900;\">" + dd + "</span>");
            } else {
                document.write("<span style=\"color: black; font-weight: 900;\">" + dd + "</span>");
            }

        } else {
            document.write(dd);
        }
        document.write("</td>");

        if (day_of_week(yyyy, MM, dd) != 6 && dd == finalday_of_Month(yyyy, MM, dd)) {
            for (var k = day_of_week(yyyy, MM, dd); k < 6; k++){
                document.write("<td></td>");
            }
        }

        if (day_of_week(yyyy, MM, dd) == 6) {
            document.write("</tr>");
        }
    }
    document.write("</table>");
}

// For Resize
function resize(yyyy, MM) {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    const header = document.querySelector('header');
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');
    const calendartitle = document.querySelector('#calendar_title');
    const year_month = document.querySelector('#year_month');
    const footer = document.querySelector('footer');

    let headerHeight = header.offsetHeight;
    let asideWidth = aside.offsetWidth;
    let calendartitleHeight = calendartitle.offsetHeight;
    let footerHeight = footer.offsetHeight;
    let calendarHeight = innerHeight - headerHeight - calendartitleHeight - weeks_of_month(yyyy, MM) - footerHeight;

    header.style.width = innerWidth + 'px';
    main.style.width = (innerWidth - asideWidth) + 'px';
    main.style.height = (innerHeight - headerHeight - footerHeight) + 'px';
    aside.style.height = (innerHeight - headerHeight - footerHeight) + 'px';
    year_month.style.width = (innerWidth - asideWidth - 146) + 'px';

    for (var i = 0; i <= weeks_of_month(yyyy, MM); i++) {
        let tr = document.getElementsByTagName('tr')[i];
        for (var j = 0; j <= 6; j++) {
            let td = tr.getElementsByTagName('td')[j];
            td.style.width = (innerWidth - asideWidth - 6) / 7 + 'px';
            if (i == 0) {
                td.style.height = calendarHeight * (5/100) + 'px';
            } else {
                td.style.height = (calendarHeight * (95/100)) / weeks_of_month(yyyy, MM) + 'px';
            }

            if (i < weeks_of_month(yyyy, MM)) {
                td.style.borderBottom = "1px solid rgb(180, 180, 180)";
            }

            if (j < 6) {
                td.style.borderRight = "1px solid rgb(180, 180, 180)";
            }
        }
    }
}
