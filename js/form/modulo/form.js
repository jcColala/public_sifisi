const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_modulo, {
    nuevo: function() {
        get_modal(_path_controller_modulo, _prefix_modulo)
    },
    editar: function(id) {
        get_modal(_path_controller_modulo, _prefix_modulo, "edit", id)
    },
    eliminar_restaurar: function(id, obj) {
        var $self = this
        let accion__ = obj.getAttribute('data-action')
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_modulo + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //loading();
                },
                success: function(response) {
                    //return console.log(response)
                    toastr.success('Registro ' + textaccion__ + ' correctamente', 'Notificación módulo')
                    $self.callback(response)
                    init_btndelete()
                },
                complete: function() {
                    //loading("complete");
                },
                error: function(e) {
                    mostrar_errores_externos(e)
                }
            })
        })

    },
    guardar: function() {
        var $self = this;
        let _form = "#form-" + _path_controller_modulo
        let post_data = new FormData($(_form)[0])
        post_data.append("acceso_directo", acceso_directo_)
        
        array_funcion.forEach((datos, index) => {
            if (datos.item.id) {
                post_data.append("modulo_funcion[" + index + "][index]", index)
                post_data.append("modulo_funcion[" + index + "][id]", datos.item.id)
            }
        })
        //for (var pair of post_data.entries()) {console.log(pair[0]+ ', ' + pair[1]);} return false
        $.ajax({
            url: route(_path_controller_modulo + '.store'),
            type: 'POST',
            data: post_data,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                toastr.success('Datos grabados correctamente', 'Notificación módulo')
                $self.callback(response)
                close_modal(_path_controller_modulo)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_modulo);
                    $.each(e.responseJSON.errors, function(i, item) {
                        if (i == 'required_accesos')
                            return toastr.warning('Error al elliminar funciones , primero es necesario quitar los accesos', 'Notificación módulo')

                        $('#' + i + "_" + _prefix_modulo).addClass('is_invalid');
                        $('.select2-' + i + "_" + _prefix_modulo).addClass('select2-is_invalid');
                        $('.' + i + "_" + _prefix_modulo).removeClass('d-none');
                        $('.' + i + "_" + _prefix_modulo).attr('data-content', item);
                        $('.' + i + "_" + _prefix_modulo).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_modulo + " .msj_error_exist").first().popover('show');


                } else {
                    mostrar_errores_externos(e)
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_modulo);
    }
});
