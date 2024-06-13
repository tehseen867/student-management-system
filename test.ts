#! /usr/bin/env node
import inquirer from "inquirer"
import chalk from "chalk"
console.log(chalk.blueBright('\n<<<=====>>> WELCOME ~ TO ~ STUDENT ~ MANAGEMENT ~ SYSTEM <<<=====>>>\n'))

let cash_balance = 2000
let students: any[] = []

class Student_info {
    first_name: string
    second_name: string
    age: number
    Id: number
    date_of_enrollment: string
    enrolled_courses: string
    constructor(first_name: string, second_name: string, age: number, Id: number, date_of_enrollment: string, enrolled_courses: string) {
        this.first_name = first_name
        this.second_name = second_name
        this.age = age
        this.Id = Id
        this.date_of_enrollment = date_of_enrollment
        this.enrolled_courses = enrolled_courses
    }
}
do {

    let Std_id = Math.floor(Math.random() * 10000) + 10000

    let action = await inquirer.prompt([{
        name: 'select_action',
        type: 'list',
        message: chalk.greenBright('how can i help you ?'),
        choices: ['enroll student', 'check student status', 'remove student']
    }])

    if (action.select_action === 'enroll student') {
        let collect_data = await inquirer.prompt([
            {
                name: 'FirstName',
                type: 'input',
                message: chalk.magentaBright('enter your first name'),
                validate: (name) => {
                    if (isNaN(name) && (name.trim() !== "")) {
                        return true
                    }
                    else {
                        console.log(chalk.red(' please enter valid name'))
                    }
                }

            },
            {
                name: 'secondName',
                type: 'input',
                message: chalk.magentaBright('enter your second name'),
                validate: (name) => {
                    if (isNaN(name) && (name.trim() !== "")) {
                        return true
                    }
                    else {
                        console.log(chalk.red(' please enter valid name'))
                    }
                }

            },
            {
                name: 'age',
                type: 'input',
                message: chalk.magentaBright('please enter your age in digits'),
                validate: (age) => {
                    if (!isNaN(age) && age > 10 && age <= 100) {
                        return true
                    }
                    else if (age < 11) {
                        console.log(chalk.red(`you are too younger. we can't admit you`))
                    }
                    else {
                        console.log(chalk.red(' please enter valid age in digits'))
                    }
                }

            },
            {
                name: 'select_course',
                type: 'list',
                message: chalk.magentaBright('which course you want to enroll ?'),
                choices: ['java', 'HTML', 'CSS', 'javascript', 'python']
            }])

        let course_fees: { [key: string]: number } = {
            java: 1000,
            HTML: 1000,
            CSS: 2500,
            javascript: 1500,
            python: 2000
        }
        let courseFee = course_fees[collect_data.select_course]
        console.log(chalk.green(`course fee is ${courseFee}`))
        let pay_fee = await inquirer.prompt([{
            name: 'pay_Fee',
            type: 'list',
            message: chalk.magentaBright('pay fee via'),
            choices: ['Cash', 'Online']
        }])
        if (pay_fee.pay_Fee === 'Cash') {
            if (courseFee <= cash_balance) {
                console.log(chalk.green('CONGRATULATIONS!!!!! you are successfully enrolled.'))

                let currentCAsh = cash_balance - courseFee
                cash_balance = currentCAsh

                let enroll_date = new Date()
                let newDate = enroll_date.toDateString()

                let add_std = new Student_info(collect_data.FirstName, collect_data.secondName, collect_data.age, Std_id, newDate, collect_data.select_course)
                students.push(add_std)
            }
            else {
                console.log(chalk.red('SORRY . you dont have enough cash for this course .'))

            }
        }
        else {
            console.log(chalk.green('CONGRATULATIONS!!!!! you are successfully enrolled.'))
            let enroll_date = new Date()
            let newDate = enroll_date.toDateString()
            let add_std = new Student_info(collect_data.FirstName, collect_data.secondName, collect_data.age, Std_id, newDate, collect_data.select_course)
            students.push(add_std)
        }
    }
    else if (action.select_action === 'remove student') {
        if (students.length > 0) {
            let studentNames = students.map(student => `${student.first_name} ${student.second_name}`)
            let remove_std = await inquirer.prompt([{
                name: 'remove',
                type: 'list',
                message: 'select',
                choices: studentNames
            }])

            let selected_student = students.find(student => `${student.first_name} ${student.second_name}` === remove_std.remove)
            let confirmation = await inquirer.prompt([{
                name: 'confirm_std',
                type: 'list',
                message: chalk.magentaBright('are you sure ? '),
                choices: ["yes", "no"]
            }])
            if (confirmation.confirm_std === "yes") {
                let remove_student = students.indexOf(selected_student)
                students.splice(remove_student, 1)
            }
            else {
                process.exitCode
            }
        }
        else {
            console.log(chalk.red(`the student list is empty`))
        }
    }

    else {
        if (students.length > 0) {
            let studentNames = students.map(student => `${student.first_name} ${student.second_name}`)
            let select_std = await inquirer.prompt([{
                name: 'select_student',
                type: 'list',
                message: chalk.magentaBright('select student to see its details'),
                choices: studentNames
            }])
            let selected_student = students.find(student => `${student.first_name} ${student.second_name}` === select_std.select_student)
            if (selected_student) {
                console.log(selected_student)
            }
            else {
                console.log(chalk.red("student not found"))
            }
        }

        else {
            console.log(chalk.red('No sudent has been enrolled'))
        }
    }
    let Continue = await inquirer.prompt([{
        name: 'continue_again',
        type: 'list',
        message: chalk.magentaBright('want to continue ?'),
        choices: ['yes', 'no']
    }])
    if (Continue.continue_again === 'yes') {

    }
    else {
        process.exit()
    }
}
while (true)

