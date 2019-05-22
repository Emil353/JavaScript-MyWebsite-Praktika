/* Startup */
/* HTML Table 'teachers' */
var teachers = document.getElementById("teachers");

/* Buttons for creating and deleting teachers from the HTML Table 'teachers' and from LocalStorage 'teacherList' */
var createTeacher = document.getElementById("createTeacher");
var deleteTeacher = document.getElementById("deleteTeacher");

/* Variable for setting the id of each teacher in other functions */
var teacherNumber;

/* Tries to get the list from LocalStorage, if it's empty it returns nothing */
var teacherList = JSON.parse(localStorage.getItem('teacherList'));

/* Instantly tries to fill the table, if there is no data to extract, does nothing */
printTeacherTable();
printScheduleTable();


/* HTML Table 'schedule' */
var schedule = document.getElementById("schedule");

/* Button for setting the schedule for a specific day and also clearing schedule */
var insertSchedule = document.getElementById("insertSchedule");
var clearSchedule = document.getElementById("clearSchedule");

/* Tries to get the schedule data from LocalStorage, if empty it returns nothing */
var scheduleList = JSON.parse(localStorage.getItem('scheduleList'));



/* Events */
/* Create Teacher */
createTeacher.addEventListener("click", function () {
    var insertTeacherName = document.getElementById("insertTeacherName").value;
    var insertTeacherSubject = document.getElementById("insertTeacherSubject").value;

    if (localStorage.getItem("teacherList") === null) {
        var teacherList = [];
        teacherNumber = 1;

        var teacher = new Teacher(teacherNumber, insertTeacherName, insertTeacherSubject);
        teacherList.push(teacher);

        localStorage.setItem('teacherList', JSON.stringify(teacherList));

    } else {
        var teacherList = JSON.parse(localStorage.getItem('teacherList'));
        if (teacherList.length < 9) {
            teacherNumber = teacherList.length;
            teacherNumber += 1;

            var teacher = new Teacher(teacherNumber, insertTeacherName, insertTeacherSubject);
            teacherList.push(teacher);

            localStorage.setItem('teacherList', JSON.stringify(teacherList));
        } else {
            console.log("You have hit the max cap of teacher");
        }

    }

    document.getElementById("insertTeacherName").textContent = "";
    document.getElementById("insertTeacherSubject").textContent = "";



    clearTeacherTable();
    printTeacherTable();
});

/* Delete Teacher from 'teacherList' */
deleteTeacher.addEventListener("click", function () {
    teacherList = JSON.parse(localStorage.getItem('teacherList'));

    var deleteTeacherById = document.getElementById("deleteTeacherById").value;
    if (teacherList.length >= deleteTeacherById) {
        deleteTeacherById -= 1;
        teacherList.splice(deleteTeacherById, 1);
        localStorage.setItem('teacherList', JSON.stringify(teacherList));

        clearTeacherTable();
        printTeacherTable();

        console.log(teacherList);

        clearScheduleTable();
        printScheduleTable();
        
    } else {
        console.log("Teacher does not exist");
    }


});


/* Create Schedule */
insertSchedule.addEventListener("click", function () {
    var scheduleSelector = parseInt(document.getElementById("scheduleSelector").value, 10);
    var cell = schedule.rows[scheduleSelector].cells;

    //    var lessons = [cell[1], cell[2], cell[3], cell[4], cell[5], cell[6], cell[7], cell[8], cell[9], cell[10], cell[11]];
    var lessonInput = [document.getElementById("one").value, document.getElementById("two").value, document.getElementById("three").value,
                        document.getElementById("four").value, document.getElementById("five").value, document.getElementById("six").value,
                        document.getElementById("seven").value, document.getElementById("eight").value, document.getElementById("nine").value,
                        document.getElementById("ten").value, document.getElementById("eleven").value];

    //    for (i = 0; i < lessons.length; i++) {
    //        for (teacherNumber = 0; teacherNumber < teacherList.length; teacherNumber++) {
    //            if (teacherList[teacherNumber].teacherId == lessonInput[i]) {
    //                lessons[i].innerHTML = lessonInput[i];
    //            }
    //        }
    //    }


    if (localStorage.getItem("scheduleList") === null) {
        var scheduleList = [];
        scheduleList.length = 5;
        scheduleList[scheduleSelector - 1] = lessonInput;
        localStorage.setItem('scheduleList', JSON.stringify(scheduleList));
    } else {
        scheduleList = JSON.parse(localStorage.getItem("scheduleList"));
        scheduleList[scheduleSelector - 1] = lessonInput;
        localStorage.setItem('scheduleList', JSON.stringify(scheduleList));
    }
    clearScheduleTable();
    printScheduleTable();

});

/* Clear Schedule */
clearSchedule.addEventListener("click", function () {
    clearScheduleTable();
    var scheduleList = [];
    scheduleList.length = 5;
    localStorage.setItem('scheduleList', JSON.stringify(scheduleList));
});


/* Functions */
/* Teacher Constructor */
function Teacher(teacherId, teacherName, teacherSubject) {
    this.teacherId = teacherId;
    this.teacherName = teacherName;
    this.teacherSubject = teacherSubject;
}

/* Print Teacher List */
function getTeacherList() {
    console.log(teacherList);
}

/* Clear HTML Table 'teachers' */
function clearTeacherTable() {
    for (var i = teachers.rows.length - 1; i > 0; i--) {
        teachers.deleteRow(i);
    }
}

/* Fill HTML Table 'teachers' with data from LocalStorage 'teacherList' */
function printTeacherTable() {
    teacherList = JSON.parse(localStorage.getItem('teacherList'));
    if (teacherList != null) {
        var teacherTableId = 1;
        for (teacherNumber = 0; teacherNumber < teacherList.length; teacherNumber++) {
            teacherList[teacherNumber].teacherId = teacherTableId;

            teacherTableId++;
            var newTeacher = teachers.insertRow(-1);

            var newTeacherId = newTeacher.insertCell(0);
            newTeacherId.innerHTML = teacherList[teacherNumber].teacherId;

            var newTeacherName = newTeacher.insertCell(1);
            newTeacherName.innerHTML = teacherList[teacherNumber].teacherName;

            var newTeacherSubject = newTeacher.insertCell(2);
            newTeacherSubject.innerHTML = teacherList[teacherNumber].teacherSubject;
        }
    }
}

/* Fillm HTML Table 'schedule' wtih data from LocalStorage 'scheduleList' */
function printScheduleTable() {
    var schedule = document.getElementById("schedule");
    scheduleList = JSON.parse(localStorage.getItem('scheduleList'));
    if (scheduleList != null) {
        var scheduleTableId = 1;
        for (var i = 0; i < scheduleList.length; i++) {
            var cell = schedule.rows[scheduleTableId].cells;
            scheduleTableId++;
            for (var a = 1; a < cell.length; a++) {
                if (scheduleList[i] != null) {
                    for (teacherNumber = 0; teacherNumber < teacherList.length; teacherNumber++) {
                        if (teacherList[teacherNumber].teacherId == scheduleList[i][a - 1]) {
                            cell[a].innerHTML = scheduleList[i][a - 1];
                        }
                    }

                }
            }
        }
    }
}

/* Clear HTML Table 'schedule' */
function clearScheduleTable() {
    var schedule = document.getElementById("schedule");
    scheduleList = JSON.parse(localStorage.getItem('scheduleList'));
    if (scheduleList != null) {
        var scheduleTableId = 1;
        for (var i = 0; i < scheduleList.length; i++) {
            var cell = schedule.rows[scheduleTableId].cells;
            scheduleTableId++;
            for (var a = 1; a < cell.length; a++) {
                cell[a].innerHTML = "";
            }
        }
    }
}
