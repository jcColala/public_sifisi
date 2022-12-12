const text_icono = (e, obj, _key, _paht) => {
    let valor = $('input:text[name=icono]').val()
    set_icono(_key, valor, _paht)
}

form.register(_path_controller_documentos, {
    nuevo: function() {
        get_modal(_path_controller_documentos,_prefix_documentos)
    },
    editar: function(id) {
        get_modal(_path_controller_documentos, _prefix_documentos, "edit", id)
    },
    aprobar: function(id){
        var $self = this
        let accion__ = 'aprobar'
        let textaccion__ = (accion__.substring(0, 7)) + 'ado'

        swal({ title: "Confirmar", text: "¿Desea " + accion__ + " el registro seleccionado?", type: "warning", showCancelButton: !0, confirmButtonText: "Confirmar", cancelButtonText: "Cancelar" }, function() {

            $.ajax({
                url: route(_path_controller_documentos + '.destroy', 'aprobar'),
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
                url: route(_path_controller_documentos + '.destroy', 'delete'),
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
                                toastr.warning(item, 'Notificación documentoses')
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
        let _form = "#form-" + _path_controller_documentos
        var formData = new FormData();
        formData.append('id', $('#id_').val());
        formData.append('idpersona_solicita', $('#idpersona_solicita_').val());
        formData.append('codigo', $('#codigo_').val());
        formData.append('descripcion', $('#descripcion_').val());
        formData.append('version', $('#version_').val());
        formData.append('fecha_emision', $('#fecha_emision_').val());
        formData.append('fecha_aprobacion', $('#fecha_aprobacion_').val());
        formData.append('ubicacion_fisica', $('#ubicacion_fisica_').val());
        formData.append('idtipo_documento', $('#idtipo_documento_').val());
        formData.append('identidad', $('#identidad_').val());
        formData.append('idresolucion', $('#idresolucion_').val());
        formData.append('porcentaje', $('#porcentaje_').val());
        formData.append('archivo', $('#archivo_')[0].files[0]);

        $.ajax({
            url: route(_path_controller_documentos + '.store'),
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                //loading();
            },
            success: function(response) {
                if(response.type == "error"){
                    toastr.error(response.text, '')
                    $self.callback(response)
                    return close_modal(_path_controller_documentos)
                }
                //toastr.success('Datos grabados correctamente','Notificación '+_path_controller_documentos, {"timeOut":500000,"tapToDismiss": false})
                toastr.success('Datos grabados correctamente', '')
                $self.callback(response)
                close_modal(_path_controller_documentos)
            },
            complete: function() {
                //loading("complete");
            },
            error: function(e) {

                //Msj($("#descripcion"), "Ingrese Descripcion ","","above",false)
                if (e.status == 422) { //Errores de Validacion
                    limpieza(_path_controller_documentos);
                    $.each(e.responseJSON.errors, function(i, item) {
                        $('#' + i+"_"+_prefix_documentos).addClass('is_invalid');
                        $('.' + i+"_"+_prefix_documentos).removeClass('d-none');
                        $('.' + i+"_"+_prefix_documentos).attr('data-content', item);
                        $('.' + i+"_"+_prefix_documentos).addClass('msj_error_exist');

                    });
                    $("#form-" + _path_controller_documentos + " .msj_error_exist").first().popover('show');


                } else if (e.status == 419) {
                    console.log(msj_sesion);
                } else if (e.status == 500) {
                    console.log((e.responseJSON.message) ? msj_soporte : ' ');
                }
            }
        })

    },
    callback: function(data) {
        grilla.reload(_path_controller_documentos);
    }
});
