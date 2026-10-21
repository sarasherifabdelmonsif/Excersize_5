function getStudent(id) {
    let student = {
        id: id
    };
    registerInputs.forEach(function (registerInput) {
        let key = registerInput.name,
            value = registerInput.value;
        student[key] = value;
    })
    return student;
}

function addStudent() {
    let focusInput = registerForm.querySelector("input:focus"),
        InvalidInput = registerForm.querySelector("input[data-valid='false']");
    focusInput?.blur();

    let invalidInput = registerForm.querySelector("input.is-invalid");

    if (invalidInput !== null || InvalidInput !== null) {
        return;
    }

    let student = getStudent(++id);
    console.log(students);
    students.push(student);
    updateLocalStorage();
    showStudent(student);
    isNoData(students);
    resetForm();
}

function showStudent(student) {
    tableBody.innerHTML += `
<tr data-student-id='${student.id}'>
    <th>${student.id}</th>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.phone}</td>
    <td>
    <div class="buttons">
        <buttoon class="btn btn-info text-light me-2" onclick="insertStudent(${student.id}) " >Edit</buttoon>
        <buttoon class="btn btn-danger" onclick="deleteStudent(${student.id},this)" >Delete</buttoon>
    </div>
</td>
</tr>`
}

function checkInput(input) {
    let inputName = input.name,
        inputValue = input.value,
        isEmpty = inputValue === "",
        errorEle = document.querySelector(`p.alert[data-error-name="${inputName}"`),
        isInvalid = !regexInputs[inputName].test(inputValue),
        errorMsg = "";

    if (isEmpty) {
        errorMsg = "This field is required"

    } else if (isInvalid) {
        errorMsg = "Invalid Field.";

    }

    if (isEmpty || isInvalid) {
        input.classList.add("is-invalid");
        errorEle.textContent = errorMsg;
        errorEle.classList.remove("d-none");
        input.classList.remove("is-valid");
        input.dataset.valid = false
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errorEle.classList.add("d-none");
        input.dataset.valid = true;
    }

}

function resetForm() {
    registerForm.reset();
    registerInputs.forEach(function (input) {
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");
        let errorEle = document.querySelector(`p.alert[data-error-name="${input.name}"]`);
        errorEle.classList.add("d-none")
    })
    registerForm.setAttribute('data-type', 'add')
}

function updateLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function showStudents(data) {
    if (data.length == 0) {
        tableBody.innerHTML = ` <td id="TableAlert" colspan="7" class="table-warning text-center">
        There are no data
              </td > `;
    } else {
        data.forEach(function (student) {
            showStudent(student);
        })
        isNoData(data);
    }
}

function getStudentIndex(id) {
    return students.findIndex((student) => student.id == id)
}

function deleteStudent(id, that) {
    if (!confirm("Are You Sure")) {
        return students.findIndex((student) => student == id);
    }

    let studentIndex = getStudentIndex(id),
        trEle = that.closest('tr');
    //    console.log(trEle)
    students.splice(studentIndex, 1);
    trEle.remove();
    updateLocalStorage();
    isNoData(students);
    console.log(students);
}

function isNoData(data) {
    let tableAlert = document.querySelector("#TableAlert");
    if (data.length == 0) {
        tableAlert.classList.remove('d-none')
    } else {
        tableAlert.classList.add('d-none')
    }
}

function insertStudent(id) {
    resetForm()
    let editStudent = students.find(function (student) {
        return student.id === id,
            formBtn = registerForm.querySelector("button");
    })
    for (let input of registerInputs) {
        input.value = editStudent[input.name]
    }
    formBtn.textContent = "Edit"
    formBtn.classList.add('btn-info', 'text-light');
    formBtn.classList.remove('btn-success');
    registerForm.setAttribute('data-type', 'edit');
    registerForm.setAttribute('data-student-id', id);
    //console.log(id);
}
//insertStudent(id)



function editStudent() {
    let studentId = registerForm.dataset.studentId,
        student = getStudent(studentId),
        studentIndex = getStudentIndex(studentId);
    console.log(studentId);
    trEle = tableBody.querySelector(`tr[data-student-id="${studentId}"]`);
    console.log(trEle)
    trEle.innerHTML = `<th>${student.id}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td>
        <div class="buttons">
            <button class="btn btn-info text-light me-2" onclick="insertStudent(${student.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteStudent(${student.id},this) ">Delete</button>
        </div>
        </td>`

    let editBtn = trEle.querySelector('.buttons button.btn-info'),
        deletetBtn = trEle.querySelector('.buttons button.btn-danger');
    editBtn.addEventListener('click', function () {
        /* editBtn.classList.add('disabled');
        deletetBtn.classList.add('disabled'); */
        console.log(tableBody);
    })
    //console.log(deletetBtn)
    console.log(editBtn);
    console.log(deletetBtn)

    students[studentIndex] = student;

    updateLocalStorage();
    resetForm();
    //    console.log(studentId);
    formBtn.textContent = "Add";
    formBtn.classList.add('btn-success', 'text-light');
    formBtn.classList.remove('btn-info');
    registerForm.setAttribute('data-student-id', id)


}

function search(searchValue) {
    let filteredStudents = students.filter(function (student) {
        return student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            student.age.toLowerCase().includes(searchValue.toLowerCase()) ||
            student.phone.toLowerCase().includes(searchValue.toLowerCase());
    })
    showStudents(filteredStudents)
}
/*
function disabled() {

}
//disabled() */