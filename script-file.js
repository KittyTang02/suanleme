// 获取日历所需基本信息
let calendarStartTime = moment();
calendarStartTime.startOf("month");
let calendarEndTime = moment();
calendarEndTime.endOf("month");

// calendarStartTime.subtract(1,'M');
// calendarEndTime.subtract(1,'M').endOf('month');

// 插入 x年x月
addCalendarTitle(calendarStartTime);

// 添加表头
addTableHead();

// 添加日历数字
addTableNumbers(calendarStartTime, calendarEndTime);

// Highlight TODAY
const today = document.getElementById(moment().format('YYYY-MM-DD'));
if (today) {today.classList.add('calendar-cell-today');}

// Mark covid-testing days
const covidTestingDays = ['2022-06-13','2022-06-14','2022-06-15','2022-06-16','2022-06-17','2022-06-18'];
markCovidTestingDays();

function addCalendarTitle(time) {
    let calendarTitle = document.getElementById("calendar-title");
    calendarTitle.innerText = time.format("YYYY[年]M[月]");
    return;
}

function addTableHead() {
    const WeekDays = ["一", "二", "三", "四", "五", "六", "日"];
    for (const DayOfWeek of WeekDays){
        const tableCell = document.createElement("div");
        tableCell.innerText = DayOfWeek;
        document.getElementById("calendar-table").appendChild(tableCell);
    }
}

function addTableNumbers(time, endTime) {
    // Column number of the first day
    const dayOfWeek = time.format('d');
    const columnNumber = dayOfWeek == 0 ? 7 : dayOfWeek;
    const firstDayId = time.format("YYYY-MM-DD");

    // Add numbers in calendar table and set ids as YYYY-MM-DD
    while (time.isBefore(endTime)) {
        const tableCell = document.createElement("div");
        tableCell.id = time.format("YYYY-MM-DD");
        tableCell.classList.add("futura-16");
        tableCell.classList.add("calendar-cell-number");
        tableCell.innerHTML = "<span>" + time.format("D") + "</span>";
        document.getElementById("calendar-table").appendChild(tableCell);
        time.add(1, "d");
    }

    // Move the first day to right column
    document.getElementById(firstDayId).style.gridColumnStart = columnNumber;
    return;
}

function markCovidTestingDays() {
    for (const id of covidTestingDays) {
        const markDateCell = document.getElementById(id);
        if (markDateCell) {
            const markPattern = document.createElement('div');
            markPattern.classList.add('calendar-covid-testing-day-green');
            container = document.getElementById(id);
            container.insertBefore(markPattern,container.firstChild);
        }
    }
    return;
}