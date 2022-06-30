// 插入 x年x月
var calendarHeader = document.getElementById('calendar-header');
calendarHeader.innerText = moment().format('YYYY[年]M[月]');

// 获取当前月份
var thisMonth = moment().format('YYYY-MM');

// 获取本月天数
var calendarMonth = thisMonth;
var daysInMonth = moment(calendarMonth ,"YYYY-MM").daysInMonth();
var date = 1;

// 获取本月1日前有几个空白格子
var emptyCellNumberInFirstRow = moment(thisMonth+'-01').format('d') - 1;
var leftEmptyCellNumberInFirstRow = emptyCellNumberInFirstRow;

// 循环一次，日历添加一行
while (date < daysInMonth) {
    var tableRow = document.createElement('tr');
    var dateCellNumber = 0;

    // 循环一次，日历添加一格
    while (dateCellNumber < 7) {

        // 添加1日前的空白格子
        if(leftEmptyCellNumberInFirstRow > 0) {
            var tableCell = document.createElement('th');
            tableCell.innerHTML = '<div></div>';
            leftEmptyCellNumberInFirstRow--;
        } else {
            switch (true) {
                case (date >= 1 && date <= daysInMonth):
                    var tableCell = document.createElement('th');
                    tableCell.innerHTML = '<div class="date-number">' + date + '</div>';
                    
                    // 设置每个<th>的id为'YYYY-MM-DD'
                    switch(true){
                        case(date < 10):
                            tableCell.id = calendarMonth + '-0' + date;
                            break;
                        case(date >= 10):
                            tableCell.id = calendarMonth + '-' + date;
                            break;
                        default:
                            break;
                    }
                    break;
                
                // 添加最后一天后的空白格子
                case (daysInMonth < date):
                    var tableCell = document.createElement('th');
                    tableCell.innerHTML = '<div></div>';
                    break;
                default:
                    break;
            }
            date++;
        }
        tableRow.appendChild(tableCell);
        dateCellNumber++;
    }
    
    var tableRowGroup = document.getElementById('table-row-group');
    tableRowGroup.appendChild(tableRow);
}

// 为今天设置空心描边样式
var today = document.getElementById(moment().format('YYYY-MM-DD'));
today.classList.add('today');

// 为核酸日设置高亮样式
var covidTestingDays = ['2022-06-13','2022-06-14','2022-06-15','2022-06-16','2022-06-17','2022-06-18'];
for (id of covidTestingDays) {
    var highlightPattern = document.createElement('div');
    highlightPattern.classList.add('covid-testing-day-pattern');
    document.getElementById(id).appendChild(highlightPattern);
}