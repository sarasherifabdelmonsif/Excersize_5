
let registerForm = document.querySelector("#Register form"),
    registerInputs = registerForm.querySelectorAll("input"),
    students = [],
    id = 0,
    tableBody = document.querySelector("#Data tbody"),
    regexInputs = {
        firstName: /^[A-Za-z]+$/,
        lastName: /^[A-Za-z]+$/,
        email: /^[A-Za-z][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|org)$/,
        age: /^[0-9]{2}$/,
        phone: /^(02)?01(1|2|0|5)[0-9]{8}$/
    },
    searchInput = document.querySelector("#searchInput");

if (localStorage.getItem('students') === null) {
    updateLocalStorage();
}

else {
    students = JSON.parse(localStorage.getItem('students'));
    //console.log(students)
    id = students[students.length - 1]?.id ?? 0;
    console.log(id);
    showStudents(students);
}

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    //editStudent(id);
    let formType = registerForm.getAttribute('data-type')
    if (formType == 'add') {
        addStudent();
    } else if (formType == 'edit') {
        editStudent();
        /* let

        editBtn.addEventListener('click', function () {

        }) */
    }
});

searchInput.addEventListener("keyup", function () {
    search(this.value)
})