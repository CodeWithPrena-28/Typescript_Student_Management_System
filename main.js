#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Define the student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //Initialize an empty array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance() {
        console.log(`Balance for ${chalk.magenta(this.name)} : $${chalk.greenBright(this.balance)}`);
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${chalk.green(amount)} Fees paid successfully for  ${this.name}`);
        console.log(`Remaining Balance: $${chalk.greenBright(this.balance)}`);
    }
    // Method to display student status
    show_status() {
        console.log(`ID: ${chalk.cyanBright(this.id)}`);
        console.log(`Name: ${chalk.magenta(this.name)}`);
        console.log(`Courses: ${chalk.magentaBright(this.courses)}`);
        console.log(`Balance: ${chalk.greenBright(this.balance)}`);
    }
}
//Deifining a student_manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new Student 
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`${chalk.magenta(name)} added successfully. Student ID: ${chalk.cyanBright(student.id)}`);
    }
    // Method to enroll a student in a course 
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${chalk.magenta(student.name)} enrolled in ${chalk.magentaBright(course)} successfully`);
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct student ID"));
        }
    }
    // Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct student ID"));
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log(chalk.magentaBright("Welcome to ‘CodeWithPrena’ - Student Management System"));
    console.log("-".repeat(55));
    let student_manager = new Student_manager();
    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("Choose an option"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using Swith Case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name"
                    }
                ]);
                console.log("-".repeat(55));
                student_manager.add_student(name_input.name);
                console.log("-".repeat(55));
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                console.log("-".repeat(55));
                student_manager.enroll_student(course_input.student_id, course_input.course);
                console.log("-".repeat(55));
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                console.log("-".repeat(55));
                student_manager.view_student_balance(balance_input.student_id);
                console.log("-".repeat(55));
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter a amount to pay",
                    }
                ]);
                console.log("-".repeat(55));
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                console.log("-".repeat(55));
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                console.log("-".repeat(55));
                student_manager.show_student_status(status_input.student_id);
                console.log("-".repeat(55));
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling a main function
main();
