// 获取日历所需基本信息
let calendarStartTime = moment();
calendarStartTime.startOf("month");
let calendarEndTime = moment();
calendarEndTime.endOf("month");
const covidTestingDays = ['2022-06-13','2022-06-14','2022-06-15','2022-06-16','2022-06-17','2022-06-18'];

renderCalendar(calendarStartTime, calendarEndTime);

function renderCalendar(calendarStartTime, calendarEndTime) {
    // 插入 x年x月
    addCalendarTitle(calendarStartTime);

    // Add buttons
    addCalendarButtons();

    // 添加标题行
    addTableHead();

    // 添加日历数字
    addTableNumbers(calendarStartTime, calendarEndTime);

    // Highlight TODAY
    const today = document.getElementById(moment().format('YYYY-MM-DD'));
    if (today) {today.classList.add('calendar-cell-today');}

    // Mark covid-testing days
    markCovidTestingDays();

    return;
}

function addCalendarTitle(time) {
    const calendarTitle = document.createElement("div");
    calendarTitle.innerText = time.format("YYYY[年]M[月]");
    calendarTitle.classList.add("calendar-title");
    calendarTitle.classList.add("hiragino-16");
    document.getElementById("calendar-title-and-buttons").appendChild(calendarTitle);
    return;
}

function addCalendarButtons(){
    addCalendarButtonArrowLeft();
    addCalendarButtonCurrentMonth();
    addCalendarButtonArrowRight();
    return;
};

function addCalendarButtonArrowLeft() {
    const button = document.createElement("div");
    button.id = "calendar-button-left";
    button.classList.add("calendar-button");
    const arrowLeft = document.createElement("div");
    arrowLeft.classList.add("arrow-left");
    button.appendChild(arrowLeft);
    button.addEventListener("click", goToPreviousMonth);
    document.getElementById("calendar-title-and-buttons").appendChild(button);
    return;
};

function addCalendarButtonCurrentMonth() {
    const button = document.createElement("div");
    button.id = "calendar-button-current";
    button.classList.add("calendar-button");
    const currentCircle = document.createElement("div");
    currentCircle.classList.add("current-circle");
    button.appendChild(currentCircle);
    button.addEventListener("click", goToCurrentMonth);
    document.getElementById("calendar-title-and-buttons").appendChild(button);
}

function addCalendarButtonArrowRight() {
    const button = document.createElement("div");
    button.id = "calendar-button-right";
    button.classList.add("calendar-button");
    const arrowRight = document.createElement("div");
    arrowRight.classList.add("arrow-right");
    button.appendChild(arrowRight);
    button.addEventListener("click", goToNextMonth);
    document.getElementById("calendar-title-and-buttons").appendChild(button);
    return;
};

function addTableHead() {
    const WeekDays = ["一", "二", "三", "四", "五", "六", "日"];
    for (const DayOfWeek of WeekDays){
        const tableCell = document.createElement("div");
        tableCell.innerText = DayOfWeek;
        document.getElementById("calendar-table").appendChild(tableCell);
    }
    return;
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

    // Set calendarStartTime to calendar month
    time.subtract(1, 'd');

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

function goToPreviousMonth(){
    calendarEndTime.subtract(1, 'M');
    calendarStartTime.subtract(1, 'M').startOf("month");
    clearCalendar();
    renderCalendar(calendarStartTime, calendarEndTime);
    return;
}

function goToCurrentMonth() {
    calendarStartTime = moment();
    calendarStartTime.startOf("month");
    calendarEndTime = moment();
    calendarEndTime.endOf("month");
    clearCalendar();
    renderCalendar(calendarStartTime, calendarEndTime);
    return;
}

function goToNextMonth(){
    calendarEndTime.add(1, 'M');
    calendarStartTime.add(1, 'M').startOf("month");
    clearCalendar();
    renderCalendar(calendarStartTime, calendarEndTime);
    return;
}

function clearCalendar() {
    document.getElementById("calendar-title-and-buttons").innerHTML = "";
    document.getElementById("calendar-table").innerHTML = "";
    return;
}