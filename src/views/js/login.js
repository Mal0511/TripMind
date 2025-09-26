document.querySelectorAll('.info-item .btn').forEach(function (button) {
    button.addEventListener('click', function () {
        document.querySelector('.container').classList.toggle('log-in');
    });
});

async function register(event) {

    event.preventDefault();

    let username = document.getElementById('regUsername').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let fullname = document.getElementById('regFullname').value.trim();
    let phone = document.getElementById('regPhone').value.trim();
    let regMessage = document.getElementById('regMessage');

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if (!username || !password || !email || !fullname || !phone) { 
        regMessage.innerText = "Please fill in all fields";
        regMessage.style.color = 'red';
        return;
    }

    if (password.length < 8) {
        regMessage.innerText = 'Password must be at least 8 charaters.';
        regMessage.style.color = 'red';
        return;
    }
    if (!lowerCaseLetter.test(password)) {
        regMessage.innerText = 'Password must contain a lowercase letter.';
        regMessage.style.color = 'red';
        return;
    }

    if (!upperCaseLetter.test(password)) {
        regMessage.innerText = 'Password must contain a uppercase letter.';
        regMessage.style.color = 'red';
        return;
    }
    if (!numbers.test(password)) {
        regMessage.innerText = 'Password must contain a numbers.';
        regMessage.style.color = 'red';
        return;
    }

    let response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, fullname, phone })
    });

    let result = await response.json();
    regMessage.innerText = result.message;
    regMessage.style.color = response.ok ? 'green' : 'red';
}
async function login(event) {

    event.preventDefault();

    let username = document.getElementById('LoginUsername').value.trim();
    let password = document.getElementById('LoginPassword').value.trim();
    let loginMessage = document.getElementById('LoginMessage');

    let response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    let result = await response.json();

    if (response.ok) {
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', result.token); 
        window.location.href = 'http://localhost:5173/'; // route do server render
    } else {
        loginMessage.innerText = result.message || 'Login failed';
        loginMessage.style.color = 'red';
    }
}

function forgotpass(event) {
    event.preventDefault();
    window.location.href = 'forgotpass.ejs'
}
function getpass(event) {
    event.preventDefault();

    let fullname = document.getElementById('ForgotFullname').value.trim();
    let email = document.getElementById('ForgotEmail').value.trim();
    let formessage = document.getElementById('ForgotMessage');

    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
    let storeUser = Object.values(users).find(user => user.fullname === fullname && user.email === email);


    if (storeUser) {
        let datapassword = storeUser.password;  // Lấy mật khẩu từ đối tượng user
        let datausername = storeUser.username;
        document.getElementById('password').textContent = `Your password is: ${datapassword}`;
        document.getElementById('username').textContent = `Your username is: ${datausername}`;
    } else {
        formessage.innerText = 'Invalid fullname or email';
        formessage.style.color = 'red';
    }
}
function Login_signup(event) {
    event.preventDefault();
    window.location.href = 'login.ejs'
}
function logout() {
    // Xóa thông tin đăng nhập trong localStorage
    localStorage.removeItem('isLoggedIn');
    // Chuyển hướng về trang login
    window.location.href = 'login.ejs';
}

// Hàm xóa tài khoản (Delete Account)
function removeuser(event) {
    event.preventDefault();

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!localStorage.getItem('isLoggedIn')) {
        alert("You need to log in first!");
        return;
    }

    // Lấy username từ localStorage hoặc từ nơi lưu trữ
    let username = prompt("Enter your username to delete your account:");

    if (!username) {
        alert("Username is required!");
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

    // Kiểm tra xem người dùng có tồn tại không
    if (users[username]) {
        // Xóa người dùng khỏi danh sách
        delete users[username];
        // Cập nhật lại vào localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Xóa thông tin đăng nhập và chuyển hướng về trang login
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.ejs';  // Chuyển hướng về trang đăng nhập

        alert("Account deleted successfully.");
    } else {
        alert("User not found.");
    }
}

// Kiểm tra nếu người dùng chưa đăng nhập, chuyển hướng về trang login
