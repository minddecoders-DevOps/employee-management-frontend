
const employeeForm = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");
const searchInput = document.getElementById("searchInput");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function displayEmployees(data = employees) {
    employeeList.innerHTML = "";

    data.forEach(employee => {
        const card = document.createElement("div");
        card.className = "employee-card";

        const name = document.createElement("h3");
        name.textContent = employee.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + employee.email;

        const department = document.createElement("p");
        department.textContent = "Department: " + employee.department;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        editButton.addEventListener("click", () => editEmployee(employee.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => deleteEmployee(employee.id));

        card.append(name, email, department, editButton, deleteButton);
        employeeList.appendChild(card);
    });
}

employeeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("employeeId").value;
    const employee = {
        id: id || Date.now().toString(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim()
    };

    if (id) {
        employees = employees.map(item =>
            item.id === id ? employee : item
        );
    } else {
        employees.push(employee);
    }

    saveEmployees();
    displayEmployees();
    employeeForm.reset();
    document.getElementById("employeeId").value = "";
    document.getElementById("submitButton").textContent = "Add Employee";
});

function editEmployee(id) {
    const employee = employees.find(item => item.id === id);

    document.getElementById("employeeId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("submitButton").textContent = "Update Employee";
}

function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);

    saveEmployees();
    displayEmployees();
}

searchInput.addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm)
    );

    displayEmployees(filteredEmployees);
});

displayEmployees();


