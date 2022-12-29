(function(){
var formulario = document.input100,
	elementos = formulario.elements;

var focusInput = function(){
	this.parentElement.children[1].className = "focus-input100 active";
	this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
};

var blurInput = function(){
	if (this.value <= 0) {
		this.parentElement.children[1].className = "focus-input100";
		this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
	}
};

for (var i = 0; i < elementos.length; i++) {
	if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
		elementos[i].addEventListener("focus", focusInput);
		elementos[i].addEventListener("blur", blurInput);
	}
}

}())