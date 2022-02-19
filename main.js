// For Header
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

function resize_header() {
    const header = document.querySelector('header');

    if (innerWidth > 500) {
        header.style.width = innerWidth + 'px';
    } else {
        header.style.width = '500px';
    }
}

// For Calendar
let today = new Date();
let today_year = today.getFullYear();
let today_month = today.getMonth() + 1;
let today_date = today.getDate();

function finalday_of_Month(year, month) {
    return 32 - new Date(year, month - 1, 32).getDate();
}

function day_of_week(yyyy, MM, dd) {
    return new Date(yyyy, MM - 1, dd).getDay();
}

function make_calendar(yyyy, MM) {
    document.write("<table border=\"1\">");

    let year_month = yyyy + ". " + MM;
    document.write("<caption>" + year_month + "</caption>");

    let day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    document.write("<tr>");
    for (var i = 0; i <= 6; i++) {
        document.write("<th id=\"day_of_the_week\">" + day[i] + "</th>");
    }
    document.write("</tr>");

    let count = 0;

    document.write("<tr>");
    if (day_of_week(yyyy, MM, 1) != 0) {
        for (var j = 1; j <= day_of_week(yyyy, MM, 1); j++) {
            document.write("<td></td>")
            count++;
        }
    }

    let length = count + finalday_of_Month(yyyy, MM);

    for (var dd = 1; dd <= finalday_of_Month(yyyy, MM); dd++) {
        document.write("<td id=\"")

        if (day_of_week(yyyy, MM, dd) == 0) {
            if (0 <= length && length <= 28) {
                document.write("sunday_4week");
            } else if (28 < length && length <= 35) {
                document.write("sunday_5week");
            } else if (35 < length) {
                document.write("sunday_6week");
            }
        } else if (day_of_week(yyyy, MM, dd) == 6) {
            if (0 <= length && length <= 28) {
                document.write("saturday_4week");
            } else if (28 < length && length <= 35) {
                document.write("saturday_5week");
            } else if (35 < length) {
                document.write("saturday_6week");
            }
        } else {
            if (0 <= length && length <= 28) {
                document.write("weekday_4week");
            } else if (28 < length && length <= 35) {
                document.write("weekday_5week");
            } else if (35 < length) {
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
        document.write("<br></td>");

        if (day_of_week(yyyy, MM, dd) == 6 || dd == finalday_of_Month(yyyy, MM, dd)) {
            document.write("</tr>");
        }
    }
    document.write("</table>");
}