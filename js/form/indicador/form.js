const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_indicador, {
    nuevo: function() {
        get_modal(_path_controller_indicador,_prefix_indicador)
    },
    editar: function(id) {
        get_modal(_path_controller_indicador, _prefix_indicador, "edit", id)
    },
    aprobar: function(id){
        var $self = this
        let accion__ = 'aprobar'
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_indicador + '.destroy', 'aprobar'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //LOADING PAGE
                },
                success: function(response) {
                    //return console.log(response)
                    if(response.type == "error"){
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
                                toastr.warning(item, 'Notificación Entidades')
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
    eliminar_restaurar: function(id, obj) {
        var $self = this
        let accion__ = obj.getAttribute('data-action')
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_indicador + '.destroy', 'delete'),
                data: { id: id, accion: accion__ },
                type: 'DELETE',
                beforeSend: function() {
                    //loading();
                },
                success: function(response) {
                    //return console.log(response)
                    toastr.success('Registro ' + textaccion__ + ' correctamente', 'Notificación Procesos Nivel 0')
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
                                toastr.warning(item, 'Notificación Proceso Nivel Cero')
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
        let _form = "#form-" + _path_controller_indicador
        let post_data = $(_form).serialize()

        $.ajax({
            url: route(_path_controller_indicador + '.store'),
            type: 'POST',
            data: post_data,
            cache: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                //toastr.success('Datos grabados correctamente','Notificación '+_path_controller_indicador, {"timeOut":500000,"tapToDismiss": false})
                toastr.success('Datos grabados correctamente', 'Notificación Procesos Nivel Cero')
                $self.callback(response)
                close_modal(_path_controller_indicador)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                //Msj($("#descripcion"), "Ingrese Descripcion ","","above",false)
                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_indicador);
                    $.each(e.responseJSON.errors, function(i, item) {
                        $('#' + i+"_"+_prefix_indicador).addClass('is_invalid');
                        $('.' + i+"_"+_prefix_indicador).removeClass('d-none');
                        $('.' + i+"_"+_prefix_indicador).attr('data-content', item);
                        $('.' + i+"_"+_prefix_indicador).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_indicador + " .msj_error_exist").first().popover('show');


                } else if (e.status == 419) {
                    console.log(msj_sesion);
                } else if (e.status == 500) {
                    console.log((e.responseJSON.message) ? msj_soporte : ' ');
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_indicador);
    }
});
