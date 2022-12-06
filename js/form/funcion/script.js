//------------------------------------------------------------- Variables globales
var mostrar_ = "N"
var boton_ = "N"

$("#form-" + _path_controller_funcion + " input").on("focus", function(e) {
    $("#form-" + _path_controller_funcion + " .msj_error_exist").first().popover('hide')
})

//------------------------------------------------------------- Mostrar
$("#mostrar_" + _prefix_funcion).on("change", function(e) {
    e.preventDefault();
    mostrar_ = mostrar_ == "N" ? "S" : "N"
})

//------------------------------------------------------------- Mostrar
$("#boton_" + _prefix_funcion).on("change", function(e) {
    e.preventDefault();
    boton_ = boton_ == "N" ? "S" : "N"
})


function init() {
    if ($("#mostrar_" + _prefix_funcion).val() == "S")
        $("#formostrar_" + _prefix_funcion).click()

    if ($("#boton_" + _prefix_funcion).val() == "S")
        $("#forboton_" + _prefix_funcion).click()
}
