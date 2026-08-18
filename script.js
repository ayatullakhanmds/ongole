function showForgotPassword() {
    document.getElementById("step1Credentials").style.display = "none";
    document.getElementById("step3Reset").style.display = "block";
    document.getElementById("modalTitle").innerText = "Reset Password";
    document.getElementById("loginError").style.display = "none";

    // Request recovery token from backend
    fetch(GAS_WEB_APP_URL, { method: "POST", body: JSON.stringify({ action: "forgotPassword" }) })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            alert("Recovery Token Generated! (Test Token: " + data.debugToken + ")");
        }
    });
}

async function submitNewPassword() {
    const token = document.getElementById("resetTokenInput").value;
    const newPassword = document.getElementById("newPasswordInput").value;
    const errorMsg = document.getElementById("loginError");

    if (!token || !newPassword) {
        errorMsg.innerText = "Please fill in all fields.";
        errorMsg.style.display = "block";
        return;
    }

    try {
        const res = await fetch(GAS_WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({ action: "resetPassword", token: token, newPassword: newPassword })
        });
        const data = await res.json();
        if (data.status === "success") {
            alert("Password updated successfully! You can now log in with your new password.");
            closeModal();
        } else {
            errorMsg.innerText = data.message || "Invalid reset token.";
            errorMsg.style.display = "block";
        }
    } catch(err) {
        errorMsg.innerText = "Password reset failed.";
        errorMsg.style.display = "block";
    }
}