//usuarios fake para teste do sistema
const users = [
  {
    email: "admin@email.com",
    password: "admin123",
    role: "ADMIN"
  },
  {
    email: "user@email.com",
    password: "123456",
    role: "USER"
  },
  {
    email: "viniciuscandido375@gmail.com",
    password: "METEOLOKO",
    role: "USER"
  }
];

const form = document.getElementById("login-form");
form.addEventListener("submit", function (e) {
    e.preventDefault(); // não deixa a pagina recarregar

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.email === email && u.password === password);

    console.log("Email:", email);
    console.log("Senha:", password);
    console.log(user)
    if (user) {
    message.textContent = "Login realizado com sucesso!";
    message.style.color = "green";

    //comando para dar tempo de ver a mensagem de confirmação
    setTimeout(() => {
        //se a role for === admin joga pra admin, se não vai pro index
        if (user.role === "ADMIN") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    }, 800);
    } 
    else {
    message.textContent = "Email ou senha incorretos";
    message.style.color = "red";
}
});

const message = document.getElementById("login-message");
