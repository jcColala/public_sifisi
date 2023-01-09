const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_comision, {
    nuevo: function() {
        get_modal(_path_controller_comision, _prefix_comision)
    },
    editar: function(id) {
        get_modal(_path_controller_comision, _prefix_comision, "edit", id)
    },
    eliminar_restaurar: function(id, obj) {
        var $self = this
        let accion__ = obj.getAttribute('data-action')
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_comision + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //LOADING PAGE
                },
                success: function(response) {
                    //return console.log(response)
                    if (response.type == "error") {
                        toastr.error(response.text)
                        $self.callback(response)
                        return init_btndelete()
                    }

                    toastr.success('Registro ' + textaccion__ + ' correctamente')
                    $self.callback(response)
                    init_btndelete()
                },
                complete: function() {
                    //loading("complete");
                },
                error: function(e) {
                    if (e.status == 422) { //Errores de Validacion
                        $.each(e.responseJSON.errors, function(i, item) {
                            if (i == 'referencias') {
                                toastr.warning(item, 'Notificación comisiones')
                            }

                        });
                    }
                    if (e.status == 419) { //Errores de Sesión
                        console.log(msj_sesion);
                    } else if (e.status == 500) {
                        console.log((e.responseJSON.message) ? msj_soporte : ' ');
                    }
                }
            })
        })

    },
    guardar: function() {
        var $self = this;
        let _form = "#form-" + _path_controller_comision
        let post_data = new FormData($(_form)[0])
        post_data.append("especiales", especiales_)

        array_responsables.forEach((datos, index) => {
            if (datos.item.id) {
                post_data.append("responsable[" + index + "][index]", index)
                post_data.append("responsable[" + index + "][id]", datos.item.id)
                post_data.append("responsable[" + index + "][presidente]", datos.item.presidente)
            }
        })
        //for (var pair of post_data.entries()) {console.log(pair[0]+ ', ' + pair[1]);} return false

        $.ajax({
            url: route(_path_controller_comision + '.store'),
            type: 'POST',
            data: post_data,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                toastr.success('Datos grabados correctamente', 'Notificación comisión')
                $self.callback(response)
                close_modal(_path_controller_comision)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_comision);
                    $.each(e.responseJSON.errors, function(i, item) {
                        if (i == 'tab2'){
                            $('.panel-tabs a[href="#'+i+'"]').tab('show')
                            return toastr.warning(item, 'Notificación comisión')
                        }
                        $('#' + i + "_" + _prefix_comision).addClass('is_invalid');
                        $('.' + i + "_" + _prefix_comision).removeClass('d-none');
                        $('.' + i + "_" + _prefix_comision).attr('data-content', item);
                        $('.' + i + "_" + _prefix_comision).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_comision + " .msj_error_exist").first().popover('show');


                } else if (e.status == 419) {
                    console.log(msj_sesion);
                } else if (e.status == 500) {
                    console.log((e.responseJSON.message) ? msj_soporte : ' ');
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_comision);
    }
});