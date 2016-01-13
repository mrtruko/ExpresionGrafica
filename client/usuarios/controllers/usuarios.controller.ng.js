'use strict'

angular.module('graficaExpresionApp')
.controller('UsuariosCtrl', function($scope,$meteor,$rootScope, $state, $modal) {

  $scope.viewName = 'Usuarios';
        $scope.users = $meteor.collection(Meteor.users, false).subscribe("users");
        $scope.imagenes = $meteor.collectionFS(Imagenes, false, Imagenes).subscribe('imagenes');
        $scope.roles = ['Produccion', 'Bodeguero', 'Recepcionista', 'Gerente'];
        $scope.usuario = {};
        $scope.usuario.selection = [];
        //Roles.addUsersToRoles("Xv6v3X62FvSNN8D9r", ['player','goalie'])
        //Roles.removeUsersFromRoles("Xv6v3X62FvSNN8D9r", 'goalie');
        console.log($scope.users);
        $scope.toggleSelection = function toggleSelection(role) {
            var idx = $scope.usuario.selection.indexOf(role);

            // is currently selected
            if (idx > -1) {
                $scope.usuario.selection.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.usuario.selection.push(role);
            }
            console.log($scope.usuario.selection);
        };
        $scope.create = function(nose){
            $scope.usuario.displayName = $scope.usuario.firstName +" " +$scope.usuario.lastName;
            if($scope.usuario.password===undefined){
                $scope.msgAlerta("Ingrese Contraseña","error");
               return;
            }
            var perfil = ({
                nombre: $scope.usuario.firstName,
                apellido: $scope.usuario.lastName,
                telefono: $scope.usuario.telefono,
                direccion: $scope.usuario.direccion,
                rut: $scope.usuario.rut,
                displayName : $scope.usuario.displayName
            });
            var usuario =  ({
                email: $scope.usuario.email,
                username : $scope.usuario.username,
                password: $scope.usuario.password,
                profile: perfil,
            });

            var error = Meteor.call('insertUser', usuario,
                function(error,result){
                    if(error){
                        console.log('error',error);
                        if(error.error === 403){
                            $scope.msgAlerta("Usuario ya existe.","error");
                        }else{
                            $scope.msgAlerta(error.reason,"error");
                        }

                    }else if(result){
                        console.log('result',result);
                        $scope.usua = $meteor.object(Meteor.users, result, false);
                        if ($scope.myCroppedImage !== '') {
                            $scope.imagenes.save($scope.myCroppedImage).then(function(result) {
                                $scope.uploadedImage = result[0]._id;
                                console.log("guardado img perfil" +$scope.uploadedImage.url({brokenIsFine: true}));
                                $scope.usua.profile.imgPerfil = $scope.uploadedImage.url({brokenIsFine: true});
                                $scope.usua.save().then(function(numberOfDocs){
                                    console.log('save success doc affected ', numberOfDocs);
                                }, function(error){
                                    console.log('save error', error);
                                });;
                            });
                        }

                        Roles.addUsersToRoles(result, $scope.usuario.selection);
                        $state.go("usuarios");
                        $scope.msgAlerta("Guardado","success");
                        $scope.usuario = {};
                    }

                    // if(!error) {
                    //  Router.go('/checklist/'+response);
                    // }
                });
        };
        $scope.sms = function(){
            Meteor.call('sms', 1,
                function(error,result){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("enviado");
                    }
                });
        }
        $scope.addImages = function (files) {
            if (files.length > 0) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.imgSrc = e.target.result;
                        $scope.myCroppedImage = '';
                    });
                };

                reader.readAsDataURL(files[0]);
            }
            else {
                $scope.imgSrc = undefined;
            }
        };
        $scope.estado = function(id){
        $scope.est = "activo";
        if (Roles.userIsInRole(id, 'inactivo')) {
            //Roles.removeUsersFromRoles(id, 'inactivo')
            $scope.est = "Inactivo";
        }else{
            $scope.est = "Activo";
        }
        return $scope.est;
    };
        $scope.cambiarEstado = function(id){
            if (Roles.userIsInRole(id, 'inactivo')) {
                Roles.removeUsersFromRoles(id, 'inactivo')
            }else{

                Roles.addUsersToRoles(id, ['inactivo']);
            }
        };
       $scope.cambiarPass = function(id){
           $scope.usuarioP = $meteor.object(Meteor.users, id,false).subscribe("users");
           console.log($scope.usuarioP);
           bootbox.dialog({
                   title: "Cambiar Contraseña de "+ $scope.usuarioP.profile.displayName,
                   message: '<div class="row">  ' +
                   '<div class="col-md-12"> ' +
                   '<div class="form-group"> ' +
                   '<label class="col-md-4 control-label" for="name">Nueva Contraseña</label> ' +
                   '<div class="col-md-4"> ' +
                   '<input id="password" name="password" type="text" placeholder="Nueva Contraseña" class="form-control input-md"> ' +
                   '</div> ' +
                   '</div> ' +
                   '</div> </div>' +
                   '</form> </div>  </div>',
                   buttons: {
                       success: {
                           label: "Guardar",
                           className: "btn-success",
                           callback: function () {
                               var password = $('#password').val();
                               var usua = {id:$scope.usuarioP._id,pass:password};
                              Meteor.call('setPass', usua,
                                   function(error,result){
                                       if(error){
                                           console.log(error);
                                       }else{
                                           console.log(result);
                                       }
                                   });

                           }
                       }
                   }
               }
           );
       }
        $scope.eliminarUsuario = function(id){
            $scope.usuarioP = $meteor.object(Meteor.users, id,false).subscribe("users");
            console.log($scope.usuarioP);
            bootbox.dialog({
                    title: "Desea Eliminar a: "+ $scope.usuarioP.profile.displayName + " como Usuario del Sistema?",
                    message: "En espera de eliminación ",
                    buttons: {
                        success: {
                            label: "Eliminar",
                            className: "btn-error",
                            callback: function () {
                            $scope.users.remove($scope.usuarioP);
                            }
                        }
                    }
                }
            );
        }

        $scope.msgAlerta = function(msg,tipo){
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                theme: "future"
            }
            //Call
            Messenger().post({
                message:msg,
                showCloseButton: true,
                type: tipo
            });

        }
});