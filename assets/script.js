// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

//when the addEmployeesBtn is clicked, the collectEmployees function runs
addEmployeesBtn.addEventListener("click", function () {
  collectEmployees();
});

//setting this as an empty array 
const employeesArray = [];

// Collect employee data
const collectEmployees = function () {
  
  while (true) {
    // i realize this probably should only run at the end, but this is what i was able to get working the best
    let addEmployees = window.confirm(
      "Would you like to add another employee?"
    );
    // if user clicks cancel, all of this is logged
    if (!addEmployees) {
      // Display sorted employee data alphabetical by last name
      employeesArray.sort((a, b) => a.lastName.localeCompare(b.lastName));
      //passes the employeesArray into these functions that we'll use later
      displayEmployees(employeesArray);
      displayAverageSalary(employeesArray);
      getRandomEmployee(employeesArray);
      break;
    }

    const firstName = prompt("Please input employee's first name");
    if (firstName === null) {
      return;
    }

    const lastName = prompt("Please input employee's last name");
    if (lastName === null) {
      return;
    }

    //this ensures user is inputting numbers only in this section so we can run math later
    let salary;
    while (true) {
      salary = prompt(
        "Please input employee's salary without including the dollar sign"
      );
      if (salary === null) {
        return;
      }

      // maintain decimal points with parseFloat versus parseInt
      const salaryNumber = parseFloat(salary);
      if (!isNaN(salaryNumber)) {
        break;
      } else {
        alert("Please enter a valid number without a dollar sign");
      }
    }

    //creating our employee object to populate the employeesArray
    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: parseFloat(salary),
    };

    //adding each employee object input by user into the empArray
    employeesArray.push(employee);

    //these were mostly for me to figure out where I was having trouble with a var that couldn't be read
    console.log(employee);
    console.log(employeesArray);

    
  }
  
  //make this array accessible outside of the function so we can use the user input in the next functions!
  return employeesArray;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  let salaryTotal = 0;
  for (let i = 0; i < employeesArray.length; i++) {
    //access the employees array and then the salary and the above line will continue to loop over the empArray length adding the salaries together
    salaryTotal += employeesArray[i].salary;
  }
  // TODO: Calculate and display the average salary
  //this takes the salary total we just got and divides it by the total array length to get the average
  const averageSalary = salaryTotal / employeesArray.length;
  //the toFixed(2) is to display out two decimal points, standard for money/salaries
  console.log("Average Employee Salary:", averageSalary.toFixed(2));
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  if (employeesArray.length === 0) return;
  //here we are generating a random array number
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  //here we are pulling out the object assigned to that array position if I am correct in my wording
  //the object is the Employee object we set up in the collectEmployees function
  const randomEmployee = employeesArray[randomIndex];
  console.log("Random Employee:", randomEmployee);
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
