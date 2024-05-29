// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

addEmployeesBtn.addEventListener("click", function () {
  collectEmployees();
});

const employeesArray = [];

// Collect employee data
const collectEmployees = function () {
  while (true) {
    // i realize this probably should only run at the end, but this is what i was able to get working the best
    let addEmployees = window.confirm(
      "Would you like to add another employee?"
    );
    if (!addEmployees) {
      return;
    }

    const firstName = prompt("Please input employee's first name");
    if (firstName === null) {
      return;
    }

    const lastName = prompt("Please input employee's last name");
    if (lastName === null) {
      return;
    }

    let salary;
    while (true) {
      salary = prompt("Please input employee's salary without including the dollar sign");
      if (salary === null) {
        return;
      }

      // maintain decimal points versus parseint
      const salaryNumber = parseFloat(salary);
      if (!isNaN(salaryNumber)) {
        break;
      } else {
        alert("Please enter a valid number");
      }
    }

    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: parseFloat(salary),
    };

    employeesArray.push(employee);

    console.log(employee);
  }
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
};

/*


/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
