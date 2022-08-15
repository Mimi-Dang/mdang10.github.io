// Make sure that button is clicked once
let clicked = 0;

// Function to show the detail message
function generateBusiness() {
    if (clicked === 0) {
        clicked++;
        //Create the company
        let label1 = document.createElement('label');
        let text1 = document.createTextNode("Company (*):");
        label1.appendChild(text1);
        label1.for = 'company';

        // Create the input
        let input = document.createElement('input');
        input.id = 'company';
        input.name = 'company';
        input.type = 'text';
        input.required = 'required';

        document.querySelector('.business').appendChild(label1);
        document.querySelector('.business').appendChild(input);


        //create the message
        let label2 = document.createElement('label');
        let text2 = document.createTextNode("Details (*):");
        label2.appendChild(text2);
        label2.for = 'message2';

        // Create the textarea
        let textarea = document.createElement('textarea');
        textarea.placeholder = 'Enter more details about the business...'
        textarea.id = 'message2';
        textarea.name = 'message2';

        document.querySelector('.business').appendChild(label2);
        document.querySelector('.business').appendChild(textarea);

        let comment = document.querySelector('.message1');
        comment.innerHTML= "";
    }
}


// To delete business message
function deleteBusiness() {
    if (clicked > 0) {
        clicked = 0;
        let business = document.querySelector('.business');
        business.innerHTML= "";

        //create the message
        let label3 = document.createElement('label');
        let text3 = document.createTextNode("Comments (*):");
        label3.appendChild(text3);
        label3.for = 'message1';

        // Create the textarea
        let textarea2 = document.createElement('textarea');
        textarea2.placeholder = 'Enter your message...'
        textarea2.required = 'required';
        textarea2.id = 'message1';
        textarea2.name = 'message1';

        document.querySelector('.message1').appendChild(label3);
        document.querySelector('.message1').appendChild(textarea2);
    }
}

// Clear errors
function clearErrors() {
    document.querySelector('#errors').innerHTML = "";
}

// ---------------- Form validation -------------------------
// Why not working?
function validateForm() {
    clearErrors();
    let result = validateName();

    if (clicked > 0) {
        result = validateCompany() && result;
        result = validateDetails() && result;
    }
    else if (clicked === 0) {
        result = validateMessage() && result;
    }
    //result = validatePhone() && result;

    return result;
}

// Validate name
function validateName() {
    let errors = document.querySelector('#errors');
    let name = document.form.name.value.trim();

    if (name.length === 0) {
        errors.innerHTML += "<p> <strong>Full Name</strong> is empty! <br> Please enter your name </p>";
        return false; // failed validation
    }
    return true; // pass validation
}

// Validate company
function validateCompany() {
    let errors = document.querySelector('#errors');
    let company = document.form.company.value.trim();

    if (company.length === 0) {
        errors.innerHTML += "<p> <strong>Company</strong> is empty! <br> Please enter your company </p>";
        return false; // failed validation
    }
    return true; // pass validation
}

// Validate message
function validateMessage() {
    let errors = document.querySelector('#errors');
    let message1 = document.form.message1.value.trim();

    if (message1.length === 0) {
        errors.innerHTML += "<p> Please provide a <strong> comment </strong> </p>";
        return false; // failed validation
    }
    return true; // pass validation
}

function validateDetails() {
    let errors = document.querySelector('#errors');
    let message2 = document.form.message2.value.trim();

    if (message2.length === 0) {
        errors.innerHTML += "<p> Please provide more <strong> details </strong> about your business </p>";
        return false; // failed validation
    }
    return true; // pass validation
}

// Validate phone
// function validatePhone() {
//     let errors = document.querySelector('#errors');
//     let phone = document.form.phone.value.trim();
//     pattern = "\(\d{3}\) \d{3}-\d{4}";

//     if (phone.length === 0) {
//         errors.innerHTML += "<p> <strong>Phone</strong> is empty! <br> Please provide a phone number</p>";
//         return false; // failed validation
//     }
//     else if (!phone.match(pattern)) {
//         errors.innerHTML += "<p> Please provide a valid <strong>phone</strong> number</p>";
//         return false; // failed validation
//     }

//     return true;
// }

// ----------------- Rotating Pictures -----------------------



// -------------------------- AJAX ---------------------------

let httpRequest; // global variable

function makeRequest() {
    var url = "https://reqres.in/api/users?page=1";

    // make HTTP request object
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }

    // Register a request listener
    httpRequest.onreadystatechange = showContents;

    // Make the HTTP request
    httpRequest.open('get', url, true);
    httpRequest.send();
}

// Function that handle server response
function showContents() {
    // Check release state
    if (httpRequest.readyState === 4) {
        // Check the response code
        if (httpRequest.status === 200) {
            let data1 = httpRequest.responseText;
            console.log("The fetched data", data1); // for debugging

            // Need JSON parse with JSON data
             let jsObj = JSON.parse(data1);

            for (let i = 0; i < jsObj.data.length; i++) {
                let position = document.querySelector('.AJAX');
                let avatar = jsObj.data[i].avatar;
                let name = jsObj.data[i].first_name + " " + jsObj.data[i].last_name;
                let email = jsObj.data[i].email;
                let id = jsObj.data[i].id;

                // Get the name
                let section = document.createElement('section');
                section.id = `profile-${id}`;
                section.className = 'profile-card';

                // Get the img/avatar
                let img = document.createElement('img');
                img.src = avatar;
                img.alt = name;
                img.title = name;
                img.className = 'profile-avatar';
                img.width = 128;
                section.appendChild(img);

                // Get the name
                let div = document.createElement('div');
                let h5 = document.createElement('h5');
                h5.innerText = name;
                h5.className = 'profile-name';
                div.appendChild(h5);

                // Get the email
                let h6 = document.createElement('h6');
                let link = document.createElement('a');
                link.href = `mailto:${email}`;
                link.innerHTML = email;
                h6.className = 'profile-email';
                h6.appendChild(link);
                div.appendChild(h6);
                section.appendChild(div);
                position.appendChild(section);
            }
        } 
        else {
            alert('There was a problem with the request');
        }
    }
}


window.onload = makeRequest; // entry point