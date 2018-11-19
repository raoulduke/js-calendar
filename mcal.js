mcal = {
    init: function (initSelector) {
        let selector = initSelector ? initSelector : '#mcal';
        let now = new Date();
        let today = now.getDate();          // today's day of the month
        now.setDate(1);                     // first of the month
        let firstDayOfMonth = now.getDay(); // day of the week (0-6)
        let daysInMonth = new Date(now.getFullYear(), (now.getMonth() + 1), 0).getDate();
        let daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        let index = 0;                      // counter
        let columns = 7;                    // 7 days in a week
        let rows = 6;                       // 6 possible weeks in a month
        let calendarDay;                    // calendar dates
        let nextCalendarDay = 1;            // calendar dates for next month
        let prevCalendarDay = daysInPrevMonth - (firstDayOfMonth - 1); // calendar dates for the previous month
        let parentContainer = $(selector);

        parentContainer.html(
            '   <table>\n' +
            '        <thead>\n' +
            '            <tr>\n' +
            '                <td>Su</td><td>M</td><td>Tu</td><td>W</td><td>Th</td><td>F</td><td>Sa</td>\n' +
            '            </tr>\n' +
            '        </thead>\n' +
            '        <tbody></tbody>\n' +
            '    </table>');

        let $calendarBody = $(selector + ' tbody');

        for (let i = 0; i < rows; i++) {
            let $row = $('<tr></tr>').appendTo($calendarBody);

            for (let j = 0; j < columns; j++) {
                calendarDay = (index - firstDayOfMonth + 1);

                if (index < firstDayOfMonth) {
                    $row.append('<td class="inactive">' + prevCalendarDay + '</td>');
                    prevCalendarDay++;
                } else if (index >= firstDayOfMonth && calendarDay <= daysInMonth) {
                    if (calendarDay === today) {
                        $row.append('<td class="today">' + calendarDay + '</td>');
                    } else {
                        $row.append('<td>' + calendarDay + '</td>');
                    }
                } else if (index >= firstDayOfMonth && calendarDay > daysInMonth) {
                    $row.append('<td class="inactive">' + nextCalendarDay + '</td>');
                    nextCalendarDay++;
                } else {
                    $row.append('<td></td>');
                }

                index++;
            }
        }

        $('<tr><td colspan="7">' + now.toLocaleString("en-us", {month: "long"}) + ', ' + now.getFullYear() + '</td></tr>')
            .prependTo(selector + ' thead');
    }
};
